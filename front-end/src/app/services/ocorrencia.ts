import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocorrencia } from '../models/ocorrencia.models'; // Importe do seu arquivo de models

@Injectable({ providedIn: 'root' })
export class OcorrenciaService {
  private apiUrl = 'http://localhost:3000/api';
  
  // Guardião do estado do fluxo
  public ocorrenciaIdAtiva: number | null = null;

  constructor(private http: HttpClient) {}

  // Listagem
  obterOcorrencias(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${this.apiUrl}/dashboard`);
  }

  // Triagem: cria e retorna o ID para o componente salvar no serviço
  salvarTriagem(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/triagem`, dados);
  }

  // Evidências: usa automaticamente o ID armazenado
  salvarEvidencias(dados: any): Observable<any> {
    if (!this.ocorrenciaIdAtiva) throw new Error("Nenhuma ocorrência ativa encontrada.");
    return this.http.post(`${this.apiUrl}/evidencias`, { id: this.ocorrenciaIdAtiva, ...dados });
  }

  // Conclusão: usa automaticamente o ID armazenado
  salvarConclusao(dados: any): Observable<any> {
    if (!this.ocorrenciaIdAtiva) throw new Error("Nenhuma ocorrência ativa encontrada.");
    return this.http.post(`${this.apiUrl}/conclusao`, { id: this.ocorrenciaIdAtiva, ...dados });
  }
}