import bcrypt from 'bcrypt';
import pool from '../db.js'; // Ajuste o caminho para o seu arquivo de conexão db.js

export const login = async (req, res) => {
  const { matricula, senha } = req.body;

  console.log(`Tentativa de login. Matrícula: ${matricula}`);

  // Validação simples dos campos obrigatórios
  if (!matricula || !senha) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Matrícula e senha são obrigatórias.'
    });
  }

  try {
    // 1. Procura o usuário na tabela real do PostgreSQL
    const queryText = 'SELECT matricula, senha, nome, unidade FROM usuarios WHERE matricula = $1';
    const resultado = await pool.query(queryText, [matricula]);

    // Se não encontrar nenhuma linha, o usuário não existe
    if (resultado.rows.length === 0) {
      return res.status(401).json({ 
        status: 'erro', 
        mensagem: 'Matrícula ou senha inválidos!' 
      });
    }

    const usuarioBanco = resultado.rows[0];

    // 2. Verifica a senha usando o bcrypt (comparação segura de hash)
    let senhaValida = false;
    try {
      senhaValida = await bcrypt.compare(senha, usuarioBanco.senha);
    } catch (err) {
      console.log('Erro ao comparar com bcrypt, tentando comparação direta...');
    }

    // Plano de contingência: Se não for hash bcrypt (ex: se inseriu texto limpo direto no pgAdmin)
    if (!senhaValida && senha === usuarioBanco.senha) {
      senhaValida = true;
    }

    // 3. Resposta baseada na validação da senha
    if (senhaValida) {
      return res.status(200).json({
        status: 'sucesso',
        usuario: {
          matricula: usuarioBanco.matricula
          // Nota: Como sua tabela atual de usuários possui apenas matricula e senha,
          // se quiser retornar Nome e Unidade no Ionic, precisará adicionar essas colunas na tabela 'usuarios'
        }
      });
    } else {
      return res.status(401).json({ 
        status: 'erro', 
        mensagem: 'Matrícula ou senha inválidos!' 
      });
    }

  } catch (error) {
    console.error('Erro ao processar o login no banco de dados:', error);
    return res.status(500).json({ 
      status: 'erro', 
      mensagem: 'Erro interno no servidor ao tentar realizar login.' 
    });
  }
};

// 💡 ROTA ADICIONAL RECOMENDADA: Criar Usuário Criptografado
// Adicione esta função abaixo para você conseguir criar usuários com senha segura via Postman/Insomnia
export const cadastrarUsuario = async (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ status: 'erro', mensagem: 'Preencha todos os campos.' });
  }

  try {
    // Gera o hash seguro da senha com um custo de 10 saltos
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const queryText = 'INSERT INTO usuarios (matricula, senha) VALUES ($1, $2) RETURNING matricula';
    await pool.query(queryText, [matricula, senhaCriptografada]);

    return res.status(201).json({
      status: 'sucesso',
      mensagem: 'Usuário registrado com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    if (error.code === '23505') { // Código do Postgres para violação de chave única
      return res.status(400).json({ status: 'erro', mensagem: 'Esta matrícula já está cadastrada.' });
    }
    return res.status(500).json({ status: 'erro', mensagem: 'Erro interno ao salvar usuário.' });
  }
};