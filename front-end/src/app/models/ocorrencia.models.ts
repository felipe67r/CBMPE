export interface Ocorrencia {
  // Dados de controle
  id: number;
  protocolo: string;
  status: 'em_andamento' | 'finalizado';
  dataCriacao: Date;
  dataConclusao?: Date; // Opcional, pois só existe ao finalizar

  // Etapa 1: Triagem
  triagem: {
    tipo: string;
    gravidade: 'Baixa' | 'Média' | 'Alta';
    temVitimas: 'sim' | 'nao';
    quantidadeVitimas: number;
    riscos: string;
    statusLocal: string;
    gps: string;
  };

  // Etapa 2: Evidências (Opcional no início)
  evidencias?: {
    detalhamentoTecnico: string;
    agenteExtintor: string;
    mangueiras: string;
    protecaoRespiratoria: string;
    arrombamento: string;
    suporteBasicoVida: string;
    transporte: string;
    curativosEConsumiveis: string;
    diagnostico: string;
    ferramentasHidraulicas: string;
    iluminacaoEnergia: string;
    superficie: string;
    mergulho: string;
    cordas: string;
    seguranca: string;
    dataAtualizacao: Date;
  };

  // Etapa 3: Conclusão
  assinatura?: string; // Pode ser um base64 ou URL da imagem
}