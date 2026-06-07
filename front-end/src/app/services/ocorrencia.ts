import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Adicione esta interface (ou importe de um arquivo de models)
export interface Ocorrencia {
  id: number;
  natureza: string;
  status: string;
  gravidade: string;
  // ... adicione outros campos conforme necessário
}

@Injectable({ providedIn: 'root' })
export class OcorrenciaService {
  private apiUrl = 'http://localhost:3000/api';
  public ocorrenciaId: any = null;

  constructor(private http: HttpClient) {}

  salvarTriagem(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/triagem`, dados);
  }

  salvarEvidencias(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/evidencias`, { id: this.ocorrenciaId, ...dados });
  }

  salvarConclusao(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conclusao`, { id: this.ocorrenciaId, ...dados });
  }

  // CORREÇÃO: O retorno deve ser o array da interface Ocorrencia
  obterOcorrencias(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${this.apiUrl}/dashboard`);
  }
}