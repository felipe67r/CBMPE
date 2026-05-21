/**
 * Exemplo de uso do DataService em um componente Angular
 * Este arquivo serve como referência para implementação
 */

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example-usage',
  template: `
    <div>
      <h1>Exemplo de Uso - DataService</h1>

      <!-- Exibir usuário logado -->
      <div *ngIf="(usuarioLogado$ | async) as usuario">
        <p>Usuário: {{ usuario.nome }}</p>
        <p>Matrícula: {{ usuario.matricula }}</p>
        <p>Unidade: {{ usuario.unidade }}</p>
      </div>

      <!-- Exibir ocorrência atual -->
      <div *ngIf="(ocorrenciaAtual$ | async) as ocorrencia">
        <p>Protocolo: {{ ocorrencia.protocolo }}</p>
        <p>Natureza: {{ ocorrencia.natureza }}</p>
      </div>
    </div>
  `,
})
export class ExampleUsageComponent implements OnInit {
  usuarioLogado$!: Observable<any>;
  ocorrenciaAtual$!: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Observar usuário logado
    this.usuarioLogado$ = this.dataService.getUsuarioAtual$();

    // Observar ocorrência atual
    this.ocorrenciaAtual$ = this.dataService.getOcorrenciaAtual();

    // Exemplo de login
    this.fazerLogin();
  }

  fazerLogin() {
    this.dataService
      .login('12345', 'senha123', 'Bombeiros Centro')
      .subscribe({
        next: (response) => {
          console.log('Login bem-sucedido', response);
          this.buscarOcorrencias();
        },
        error: (error) => {
          console.error('Erro no login:', error.message);
        },
      });
  }

  buscarOcorrencias() {
    this.dataService.getOcorrencias().subscribe({
      next: (ocorrencias) => {
        console.log('Ocorrências carregadas:', ocorrencias);
        // Selecionar primeira ocorrência
        if (ocorrencias.length > 0) {
          this.dataService.setOcorrenciaAtual(ocorrencias[0]);
        }
      },
      error: (error) => {
        console.error('Erro ao buscar ocorrências:', error.message);
      },
    });
  }

  atualizarOcorrencia() {
    const ocorrenciaAtual = this.dataService.getOcorrenciaAtualSync();
    if (ocorrenciaAtual) {
      this.dataService
        .atualizarOcorrencia(ocorrenciaAtual.protocolo, {
          estado: 'Atendido',
        })
        .subscribe({
          next: (ocorrenciaAtualizada) => {
            console.log('Ocorrência atualizada:', ocorrenciaAtualizada);
          },
          error: (error) => {
            console.error('Erro ao atualizar:', error.message);
          },
        });
    }
  }

  salvarConclusao() {
    const conclusao = {
      parecer: 'Caso resolvido com sucesso',
      acoesRealizadas: ['Resgate realizado'],
      fotos: [],
    };

    this.dataService.salvarConclusao(conclusao).subscribe({
      next: () => {
        console.log('Conclusão salva com sucesso');
      },
      error: (error) => {
        console.error('Erro ao salvar conclusão:', error.message);
      },
    });
  }

  fazerLogout() {
    this.dataService.logout();
    console.log('Logout realizado');
  }
}
