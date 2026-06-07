import express from 'express';
import cors from 'cors';
import ocorrenciaRoutes from './src/routes/ocorrenciaRoutes.js'; 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

export const login = (req, res) => {
  const { matricula, senha } = req.body;
  
  if (matricula === '1234' && senha === '10203040') {
    return res.status(200).json({ mensagem: 'Login realizado', token: 'fake-token-123' });
  }
  
  return res.status(401).json({ mensagem: 'Credenciais inválidas' });
};

// Centraliza todas as rotas de ocorrência em /api
app.post('/login', login);
app.use('/api', ocorrenciaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});