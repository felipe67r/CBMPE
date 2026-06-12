import express from 'express';
import cors from 'cors';
import pool from './db.js'; // Importando a conexão do Postgres que criamos antes
import ocorrenciaRoutes from './src/routes/ocorrenciaRoutes.js'; 

const app = express();
const PORT = 3000;

app.use(cors());
// Mantido os 10mb, perfeito para as fotos em Base64 vindas do offline
app.use(express.json({ limit: '10mb' })); 

// Rota de Login integrada ao PostgreSQL
export const login = async (req, res) => {
  const { matricula, senha } = req.body;
  
  try {
    // Busca o usuário na tabela do banco de dados
    const resultado = await pool.query('SELECT * FROM usuarios WHERE matricula = $1', [matricula]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensagem: 'Matrícula não encontrada' });
    }

    const usuario = resultado.rows[0];

    // Verifica a senha (Dica: futuramente use a biblioteca 'bcrypt' para comparar hashes)
    if (usuario.senha === senha) {
      return res.status(200).json({ 
        mensagem: 'Login realizado com sucesso', 
        token: 'fake-token-123', // Depois você pode evoluir para um token JWT real
        usuario: { matricula: usuario.matricula } 
      });
    } else {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

app.post('/login', login);

// Centraliza todas as rotas de ocorrência em /api
app.use('/api', ocorrenciaRoutes);

app.listen(PORT, () => {
  // Alterado para 127.0.0.1 para evitar problemas de resolução de DNS do Localhost
  console.log(`🚀 Servidor rodando em http://127.0.0.1:${PORT}`);
});