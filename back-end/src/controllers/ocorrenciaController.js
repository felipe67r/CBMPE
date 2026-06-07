import { db } from "../models/data.js";

// 1. Etapa de Triagem
export const salvarTriagem = (req, res) => {
  const { tipo, gravidade, temVitimas, quantidadeVitimas, riscos, statusLocal, gps } = req.body;

  const novaOcorrencia = {
    id: Date.now(), // ID gerado para vincular as etapas
    triagem: {
      tipo,
      gravidade,
      temVitimas,
      quantidadeVitimas: temVitimas === 'sim' ? quantidadeVitimas : 0,
      riscos,
      statusLocal,
      gps
    },
    evidencias: null, // Será preenchido na etapa 2
    assinatura: null, // Será preenchido na etapa 3
    status: 'em_andamento',
    dataCriacao: new Date()
  };

  db.ocorrencias.push(novaOcorrencia);
  
  console.log('Triagem criada:', novaOcorrencia.id);
  return res.status(201).json({ mensagem: 'Triagem salva!', id: novaOcorrencia.id });
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

  console.log('Ocorrência finalizada:', id);
  
  return res.status(200).json({ 
    mensagem: 'Ocorrência concluída com sucesso!', 
    id: ocorrencia.id 
  });
};

if (db.ocorrencias.length === 0) {
  db.ocorrencias.push(
    {
      id: 1,
      triagem: { tipo: 'Incêndio', gravidade: 'Alta', statusLocal: 'Não controlado' },
      protocolo: '001',
      status: 'Despachado',
      dataCriacao: new Date()
    },
    {
      id: 2,
      triagem: { tipo: 'Acidente', gravidade: 'Média', statusLocal: 'Controlado' },
      protocolo: '002',
      status: 'Despachado',
      dataCriacao: new Date()
    }
  );
}

export const listarOcorrencias = (req, res) => {
  // Retorna todas as ocorrências salvas no seu banco em memória
  return res.status(200).json(db.ocorrencias);
};