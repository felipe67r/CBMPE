// src/controllers/ocorrenciaController.js
// const Ocorrencia = require('../models/Ocorrencia');

exports.listarPorUnidade = async (req, res) => {
    try {
        const { unidade } = req.query;
        // [Lógica do GET /ocorrencias?unidade=...]
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar ocorrências.' });
    }
};

exports.concluirOcorrencia = async (req, res) => {
    try {
        const { protocolo } = req.params;
        const { status, observacoes, assinatura } = req.body;
        // [Lógica do PUT /ocorrencias/:protocolo que valida os caracteres e salva a assinatura]
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao concluir ocorrência.' });
    }
};