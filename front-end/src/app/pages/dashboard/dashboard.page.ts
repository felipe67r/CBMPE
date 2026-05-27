import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavButtonComponent } from 'src/app/components/nav-button/nav-button.component';
import { OcorrenciaCardComponent } from 'src/app/components/ocorrencia-card/ocorrencia-card.component';

interface Ocorrencia {
  id: number;
  natureza: string;
  protocolo: string;
  status: 'Despachado' | 'Em andamento' | 'Finalizado' | 'Cancelado';
  gravidade: 'Baixo' | 'Média' | 'Alta';
  local: string;
  horario: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonFooter, 
    CommonModule, 
    FormsModule, 
    MainHeaderComponent, 
    NavButtonComponent,
    OcorrenciaCardComponent
  ]
})
export class DashboardPage implements OnInit {

  public ocorrencias: Ocorrencia[] = [
    {
      id: 1,
      natureza: 'Incêndio Residencial',
      protocolo: '001',
      status: 'Despachado',
      gravidade: 'Alta',
      local: 'Rua da Aurora, 123 - Boa Vista',
      horario: '19:14'
    },
    {
      id: 2,
      natureza: 'Acidente de Trânsito',
      protocolo: '002',
      status: 'Despachado',
      gravidade: 'Média',
      local: 'Av. Boa Viagem, 987 - Pina',
      horario: '03:00'
    },
    {
      id: 3,
      natureza: 'Afogamento',
      protocolo: '003',
      status: 'Despachado',
      gravidade: 'Média',
      local: 'Praia de Boa Viagem - Posto 5',
      horario: '12:01'
    },
    {
      id: 4,
      natureza: 'Resgate',
      protocolo: '004',
      status: 'Cancelado',
      gravidade: 'Baixo',
      local: 'Parque da Jaqueira',
      horario: '16:21'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }
  get totalAtivas(): number {
    return this.ocorrencias.filter(ocorrencia => ocorrencia.status === 'Despachado').length;
  }
  public iniciarAtendimento(ocorrencia: Ocorrencia) {
    console.log('Atendimento iniciado para o protocolo:', ocorrencia.protocolo);
    
    this.router.navigate(['/triagem']);
  }

}