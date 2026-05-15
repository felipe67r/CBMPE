import { Ocorrencia } from '../models/ocorrencia.model';

export const OCORRENCIAS_MOCK: Ocorrencia[] = [
  {
    protocolo: '001',
    natureza: 'Incêndio Residencial',
    estado: 'Despachado',
    gravidade: 'Alta',
    local: 'Rua da Aurora, 123 - Boa Vista',
    horaPedido: '19:14',
    riscosAdicionais: 'Rede elétrica exposta',
    statusLocal: 'Área isolada'
  },
  {
    protocolo: '002',
    natureza: 'Acidente de Trânsito',
    estado: 'Atendido',
    gravidade: 'Média',
    local: 'Av. Boa Viagem, 987 - Pina',
    horaPedido: '03:00',
    riscosAdicionais: 'Vazamento de combustível',
    statusLocal: 'Trânsito interrompido'
  }
];