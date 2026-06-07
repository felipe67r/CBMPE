import bcrypt from 'bcrypt';
import { db } from '../models/data.js';
// const Usuario = require('../models/Usuario'); // Se usar um ORM como Mongoose ou Sequelize

// Exemplo de dados (simulando um banco de dados)
const usuariosCadastrados = [
  { matricula: '1234', senha: '10203040', nome: 'Fulano de Tal', unidade: 'Unidade 1' }
];

export const login = (req, res) => {
  const { matricula, senha } = req.body;

  console.log(`Tentativa de login. Matrícula: ${matricula}`);

  // Procura o usuário no "banco"
  const usuarioEncontrado = usuariosCadastrados.find(
    (u) => u.matricula === matricula && u.senha === senha
  );

  if (usuarioEncontrado) {
    return res.status(200).json({
      status: 'sucesso',
      usuario: {
        nome: usuarioEncontrado.nome,
        matricula: usuarioEncontrado.matricula,
        unidade: usuarioEncontrado.unidade
      }
    });
  } else {
    return res.status(401).json({ 
      status: 'erro', 
      mensagem: 'Matrícula ou senha inválidos!' 
    });
  }
};