// src/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');

const app = express();

// 1. Configurações essenciais para conversar com o Ionic
app.use(cors()); 

// 2. Aumento de limite para aguentar a string da assinatura em Base64
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 3. Linkar as rotas da API
// AJUSTADO: O prefixo deve ser apenas '/auth'. 
// Como dentro de authRoutes já tem '/login', a junção vai formar exatamente '/auth/login'
app.use('/auth', authRoutes);         
app.use('/ocorrencias', ocorrenciaRoutes); 

module.exports = app;