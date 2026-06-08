import { db } from "../models/data.js";

// Função utilitária para gerar o próximo protocolo (001, 002, 003...)
const gerarProtocolo = () => {
  const proximoId = db.ocorrencias.length + 1;
  return proximoId.toString().padStart(3, '0');
};

// 1. Etapa de Triagem
export const salvarTriagem = (req, res) => {
  const { tipo, gravidade, temVitimas, quantidadeVitimas, riscos, statusLocal, gps } = req.body;

  const novaOcorrencia = {
    id: Date.now(), 
    protocolo: gerarProtocolo(), // Gera o 003, 004, etc.
    triagem: {
      tipo,
      gravidade,
      temVitimas,
      quantidadeVitimas: temVitimas === 'sim' ? quantidadeVitimas : 0,
      riscos,
      statusLocal,
      gps
    },
    evidencias: null, 
    assinatura: null, 
    status: 'em_andamento',
    dataCriacao: new Date()
  };

  db.ocorrencias.push(novaOcorrencia);
  
  console.log('Triagem criada, Protocolo:', novaOcorrencia.protocolo);
  return res.status(201).json({ 
    mensagem: 'Triagem salva!', 
    id: novaOcorrencia.id,
    protocolo: novaOcorrencia.protocolo 
  });
};

// 2. Etapa de Evidências
export const salvarEvidencias = (req, res) => {
  const { id, detalhamentoTecnico, agenteExtintor, mangueiras, protecaoRespiratoria, arrombamento, suporteBasicoVida, transporte, curativosEConsumiveis, diagnostico, ferramentasHidraulicas, iluminacaoEnergia, superficie, mergulho, cordas, seguranca } = req.body;

  const ocorrencia = db.ocorrencias.find(o => o.id === id);

  if (!ocorrencia) {
    return res.status(404).json({ mensagem: 'Ocorrência não encontrada!' });
  }

  ocorrencia.evidencias = {
    detalhamentoTecnico,
    agenteExtintor,
    mangueiras,
    protecaoRespiratoria,
    arrombamento,
    suporteBasicoVida,
    transporte,
    curativosEConsumiveis,
    diagnostico,
    ferramentasHidraulicas,
    iluminacaoEnergia,
    superficie,
    mergulho,
    cordas,
    seguranca,
    dataAtualizacao: new Date()
  };

  return res.status(200).json({ mensagem: 'Evidências salvas!', ocorrencia });
};

// 3. Etapa de Conclusão
export const salvarConclusao = (req, res) => {
  const { id, assinatura } = req.body;

  const ocorrencia = db.ocorrencias.find(o => o.id === id);

  if (!ocorrencia) {
    return res.status(404).json({ mensagem: 'Ocorrência não encontrada!' });
  }

  ocorrencia.assinatura = assinatura;
  ocorrencia.status = 'finalizado';
  ocorrencia.dataConclusao = new Date();

  console.log('Ocorrência finalizada, Protocolo:', ocorrencia.protocolo);
  
  return res.status(200).json({ 
    mensagem: 'Ocorrência concluída com sucesso!', 
    id: ocorrencia.id 
  });
};

// Inicialização de dados de teste (caso o banco esteja vazio)
if (db.ocorrencias.length === 0) {
  db.ocorrencias.push(
    {
      id: 1,
      protocolo: '001',
      triagem: { tipo: 'Incêndio', gravidade: 'Alta', statusLocal: 'Não controlado' },
      status: 'Despachado',
      dataCriacao: new Date()
    },
    {
      id: 2,
      protocolo: '002',
      triagem: { tipo: 'Acidente', gravidade: 'Média', statusLocal: 'Controlado' },
      status: 'Despachado',
      dataCriacao: new Date()
    }
  );
}

// Listagem Geral
export const listarOcorrencias = (req, res) => {
  return res.status(200).json(db.ocorrencias);
};