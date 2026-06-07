import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonToolbar, IonFooter, IonBadge } from '@ionic/angular/standalone';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavButtonComponent } from 'src/app/components/nav-button/nav-button.component';
import { OcorrenciaCardComponent } from 'src/app/components/ocorrencia-card/ocorrencia-card.component';
import { OcorrenciaService } from 'src/app/services/ocorrencia';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonToolbar, IonFooter, IonBadge, CommonModule, FormsModule,
    MainHeaderComponent, NavButtonComponent, OcorrenciaCardComponent
  ]
})
export class DashboardPage implements OnInit {

  public ocorrencias: any[] = [];

  constructor(
    private router: Router,
    private service: OcorrenciaService
  ) { }

  ngOnInit() {
    this.carregarOcorrencias();
  }

  carregarOcorrencias() {
    this.service.obterOcorrencias().subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
      },
      error: (err) => console.error('Erro ao buscar ocorrências:', err)
    });
  }

  get totalAtivas(): number {
    return this.ocorrencias.filter(o => o.status === 'Despachado').length;
  }

  public iniciarAtendimento(ocorrencia: any) {
    this.service.ocorrenciaId = ocorrencia.id; // Define o ID para o fluxo de triagem
    this.router.navigate(['/triagem']);
  }
}