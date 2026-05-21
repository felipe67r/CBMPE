const express = require('express');
const app = express();

const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Meu back-end Node.js está rodando de boas! 🚀');
});

// Rota de login que o Ionic vai chamar
app.post('/login', (req, res) => {
  const { matricula, senha, unidade } = req.body;

  console.log(`Tentativa de login. Matrícula: ${matricula}`);

  // Validação simulada (Substitua depois pela busca no Banco de Dados)
  if (matricula === '1234' && senha === '123456') {
    
    // Se estiver certo, responde com status 200 (OK) e os dados do usuário
    return res.status(200).json({
      status: 'sucesso',
      usuario: {
        nome: 'Fulano de Tal',
        matricula: matricula,
        unidade: unidade
      }
    });

  } else {
    // Se estiver errado, responde com status 401 (Não autorizado)
    return res.status(401).json({ 
      status: 'erro',
      mensagem: 'Matrícula ou senha inválidos!' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});