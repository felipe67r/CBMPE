// src/routes/ocorrenciaRoutes.js
const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

// Define as rotas de ocorrências
router.get('/', ocorrenciaController.listarPorUnidade);
router.put('/:protocolo', ocorrenciaController.concluirOcorrencia);

module.exports = router;
