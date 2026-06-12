import express from 'express';
import { 
  salvarTriagem, 
  salvarEvidencias, 
  salvarConclusao, 
  listarOcorrencias,
  sincronizarOcorrenciaCompleta // Novo controller para o offline
} from '../controllers/ocorrenciaController.js';

const router = express.Router();

router.get('/dashboard', listarOcorrencias);

// Rotas para uso quando o app está ONLINE (passo a passo)
router.post('/triagem', salvarTriagem);
router.post('/evidencias', salvarEvidencias);
router.post('/conclusao', salvarConclusao);

// Rota crucial para o modo OFFLINE (Sincroniza tudo de uma vez)
router.post('/sincronizar', sincronizarOcorrenciaCompleta);

export default router;