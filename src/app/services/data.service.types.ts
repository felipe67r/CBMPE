/**
 * Tipos e Interfaces do DataService
 * 
 * Este arquivo exporta as interfaces principais para uso em toda a aplicação
 */

import { Observable } from 'rxjs';
import { Ocorrencia } from '../core/models/ocorrencia.model';

/**
 * Interface do usuário após login bem-sucedido
 */
export interface UsuarioLogado {
  nome: string;
  matricula: string;
  unidade: string;
}

/**
 * Resposta esperada do endpoint de login
 */
export interface LoginResponse {
  usuario: UsuarioLogado;
  token?: string;
  expiresIn?: number;
}

/**
 * Payload para salvar conclusão de ocorrência
 */
export interface ConclusaoPagload {
  protocolo?: string;
  parecer: string;
  acoesRealizadas: string[];
  fotos?: string[]; // Base64
  assinaturaBase64?: string;
}

/**
 * Resposta ao salvar conclusão
 */
export interface ConclusaoResponse {
  sucesso: boolean;
  mensagem?: string;
  protocolo?: string;
}

/**
 * Interface para erros HTTP tratados
 */
export interface ErroHttp {
  codigo: number;
  mensagem: string;
  detalhes?: any;
}

/**
 * Estado completo do DataService
 */
export interface EstadoDataService {
  usuario: UsuarioLogado | null;
  ocorrencia: Ocorrencia | null;
  carregando: boolean;
  erro: ErroHttp | null;
}

/**
 * Filtros para busca de ocorrências
 */
export interface FiltrosOcorrencia {
  unidade?: string;
  estado?: Ocorrencia['estado'];
  gravidade?: Ocorrencia['gravidade'];
  dataDe?: Date;
  dataAte?: Date;
}

/**
 * Response genérica da API
 */
export interface ApiResponse<T> {
  sucesso: boolean;
  dados: T;
  mensagem?: string;
}

/**
 * Configuração do DataService
 */
export interface ConfigDataService {
  apiUrl: string;
  timeoutMs?: number;
  enableLogging?: boolean;
}

export type OcorrenciaAtualizacao = Partial<Ocorrencia>;
