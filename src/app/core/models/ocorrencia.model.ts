export interface Ocorrencia {
  protocolo: string;
  natureza: string;
  estado: 'Despachado' | 'Cancelado' | 'Atendido' | 'Concluído';
  gravidade: 'Baixa' | 'Média' | 'Alta';
  local: string;
  horaPedido: string;
  riscosAdicionais: string;
  statusLocal: string;
  // Campos extras para as semanas 3 e 4
  coordenadas?: { lat: number; lng: number };
  fotos?: string[];
  assinaturaBase64?: string;
}