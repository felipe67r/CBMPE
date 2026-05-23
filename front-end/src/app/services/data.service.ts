import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Ocorrencia } from '../core/models/ocorrencia.model';

export interface UsuarioLogado {
  nome: string;
  matricula: string;
  unidade: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly API_URL = 'http://localhost:3000';
  private readonly USUARIO_KEY = 'usuario_cbmpe';
  private readonly OCORRENCIA_KEY = 'ocorrencia_cbmpe';

  private usuarioSubject = new BehaviorSubject<UsuarioLogado | null>(
    this.obterUsuarioArmazenado()
  );
  private ocorrenciaSubject = new BehaviorSubject<Ocorrencia | null>(
    this.obterOcorrenciaArmazenada()
  );

  constructor(private http: HttpClient) {
    this.carregarEstadoInicial();
  }

  // ========== AUTENTICAÇÃO ==========

  /**
   * Realiza login do usuário
   */
  login(
    matricula: string,
    senha: string,
    unidade: string
  ): Observable<any> {
    const payload = { matricula, senha, unidade };

    return this.http.post(`${this.API_URL}/auth/login`, payload).pipe(
      tap((response: any) => {
        if (response && response.usuario) {
          const usuarioLogado: UsuarioLogado = {
            nome: response.usuario.nome,
            matricula: response.usuario.matricula,
            unidade: response.usuario.unidade,
          };
          this.armazenarUsuario(usuarioLogado);
          this.usuarioSubject.next(usuarioLogado);
        }
      }),
      catchError((error) => this.tratarErroHttp(error))
    );
  }

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    localStorage.removeItem(this.USUARIO_KEY);
    sessionStorage.removeItem(this.OCORRENCIA_KEY);
    this.usuarioSubject.next(null);
    this.ocorrenciaSubject.next(null);
  }

  /**
   * Verifica se o usuário está logado
   */
  isLoggedIn(): boolean {
    return this.usuarioSubject.value !== null;
  }

  /**
   * Retorna o usuário atualmente logado
   */
  getUsuarioAtual(): UsuarioLogado | null {
    return this.usuarioSubject.value;
  }

  /**
   * Retorna um Observable do usuário atual
   */
  getUsuarioAtual$(): Observable<UsuarioLogado | null> {
    return this.usuarioSubject.asObservable();
  }

  // ========== OCORRÊNCIAS ==========

  /**
   * Retorna um Observable da ocorrência atual
   */
  getOcorrenciaAtual(): Observable<Ocorrencia | null> {
    return this.ocorrenciaSubject.asObservable();
  }

  /**
   * Define a ocorrência atual
   */
  setOcorrenciaAtual(ocorrencia: Ocorrencia): void {
    this.armazenarOcorrencia(ocorrencia);
    this.ocorrenciaSubject.next(ocorrencia);
  }

  /**
   * Limpa a ocorrência atual
   */
  limparOcorrenciaAtual(): void {
    sessionStorage.removeItem(this.OCORRENCIA_KEY);
    this.ocorrenciaSubject.next(null);
  }

  /**
   * Obtém a ocorrência atual sem Observable
   */
  getOcorrenciaAtualSync(): Ocorrencia | null {
    return this.ocorrenciaSubject.value;
  }

  /**
   * Busca ocorrências do backend
   */
  getOcorrencias(): Observable<Ocorrencia[]> {
    const usuario = this.getUsuarioAtual();
    if (!usuario) {
      return throwError(
        () => new Error('Usuário não autenticado')
      );
    }

    return this.http
      .get<Ocorrencia[]>(
        `${this.API_URL}/ocorrencias?unidade=${usuario.unidade}`
      )
      .pipe(catchError((error) => this.tratarErroHttp(error)));
  }

  /**
   * Salva conclusão de uma ocorrência
   */
  salvarConclusao(conclusao: any): Observable<any> {
    const usuario = this.getUsuarioAtual();
    if (!usuario) {
      return throwError(
        () => new Error('Usuário não autenticado')
      );
    }

    const payload = {
      ...conclusao,
      matriculaUsuario: usuario.matricula,
      unidade: usuario.unidade,
    };

    return this.http
      .post(`${this.API_URL}/ocorrencias/conclusao`, payload)
      .pipe(
        tap(() => {
          this.limparOcorrenciaAtual();
        }),
        catchError((error) => this.tratarErroHttp(error))
      );
  }

  /**
   * Atualiza uma ocorrência
   */
  atualizarOcorrencia(
    protocolo: string,
    dados: Partial<Ocorrencia>
  ): Observable<Ocorrencia> {
    const usuario = this.getUsuarioAtual();
    if (!usuario) {
      return throwError(
        () => new Error('Usuário não autenticado')
      );
    }

    return this.http
      .put<Ocorrencia>(`${this.API_URL}/ocorrencias/${protocolo}`, {
        ...dados,
        unidade: usuario.unidade,
      })
      .pipe(
        tap((ocorrencia) => {
          this.setOcorrenciaAtual(ocorrencia);
        }),
        catchError((error) => this.tratarErroHttp(error))
      );
  }

  // ========== ARMAZENAMENTO ==========

  /**
   * Armazena usuário em localStorage
   */
  private armazenarUsuario(usuario: UsuarioLogado): void {
    try {
      localStorage.setItem(this.USUARIO_KEY, JSON.stringify(usuario));
    } catch (error) {
      console.error('Erro ao armazenar usuário no localStorage:', error);
    }
  }

  /**
   * Obtém usuário do localStorage
   */
  private obterUsuarioArmazenado(): UsuarioLogado | null {
    try {
      const usuarioJson = localStorage.getItem(this.USUARIO_KEY);
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    } catch (error) {
      console.error('Erro ao recuperar usuário do localStorage:', error);
      return null;
    }
  }

  /**
   * Armazena ocorrência em sessionStorage
   */
  private armazenarOcorrencia(ocorrencia: Ocorrencia): void {
    try {
      sessionStorage.setItem(this.OCORRENCIA_KEY, JSON.stringify(ocorrencia));
    } catch (error) {
      console.error('Erro ao armazenar ocorrência em sessionStorage:', error);
    }
  }

  /**
   * Obtém ocorrência do sessionStorage
   */
  private obterOcorrenciaArmazenada(): Ocorrencia | null {
    try {
      const ocorrenciaJson = sessionStorage.getItem(this.OCORRENCIA_KEY);
      return ocorrenciaJson ? JSON.parse(ocorrenciaJson) : null;
    } catch (error) {
      console.error('Erro ao recuperar ocorrência do sessionStorage:', error);
      return null;
    }
  }

  /**
   * Carrega estado inicial na inicialização do serviço
   */
  private carregarEstadoInicial(): void {
    const usuario = this.obterUsuarioArmazenado();
    const ocorrencia = this.obterOcorrenciaArmazenada();

    if (usuario) {
      this.usuarioSubject.next(usuario);
    }

    if (ocorrencia) {
      this.ocorrenciaSubject.next(ocorrencia);
    }
  }

  // ========== TRATAMENTO DE ERROS ==========

  /**
   * Trata erros HTTP e retorna mensagens amigáveis
   */
  private tratarErroHttp(error: HttpErrorResponse): Observable<never> {
    let mensagem = 'Ocorreu um erro ao processar sua requisição.';

    if (error.status === 401) {
      mensagem = 'Credenciais inválidas. Verifique matrícula e senha.';
      this.logout();
    } else if (error.status === 403) {
      mensagem = 'Acesso negado. Você não tem permissão para acessar este recurso.';
    } else if (error.status === 404) {
      mensagem = 'Recurso não encontrado.';
    } else if (error.status === 500) {
      mensagem = 'Erro no servidor. Por favor, tente novamente mais tarde.';
    } else if (error.status === 0) {
      mensagem = 'Erro de conexão. Verifique sua conexão com a internet e se o servidor está disponível.';
    } else if (error.error && error.error.message) {
      mensagem = error.error.message;
    }

    console.error('Erro HTTP:', error);
    return throwError(() => new Error(mensagem));
  }
}
