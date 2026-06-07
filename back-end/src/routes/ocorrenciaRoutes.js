import express from 'express';
import { salvarTriagem, salvarEvidencias, salvarConclusao, listarOcorrencias } from '../controllers/ocorrenciaController.js';

const router = express.Router();

router.get('/dashboard', listarOcorrencias);
router.post('/triagem', salvarTriagem);
router.post('/evidencias', salvarEvidencias);
router.post('/conclusao', salvarConclusao);

export default router;