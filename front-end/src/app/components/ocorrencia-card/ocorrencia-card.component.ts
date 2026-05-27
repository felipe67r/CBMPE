import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pinOutline, timeOutline } from 'ionicons/icons';

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
  selector: 'app-ocorrencia-card',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonButton, IonIcon, CommonModule],
  templateUrl: './ocorrencia-card.component.html',
  styleUrls: ['./ocorrencia-card.component.scss'] // Ficará pronto para o seu design depois
})
export class OcorrenciaCardComponent {
  // Recebe os dados de qualquer tela (Dashboard ou Admin)
  @Input() ocorrencia!: Ocorrencia;
  
  // Avisa a tela pai quando o botão for clicado
  @Output() onIniciar = new EventEmitter<Ocorrencia>();

  constructor() {
    addIcons({ pinOutline, timeOutline });
  }

  getCorGravidade(gravidade: 'Baixo' | 'Média' | 'Alta'): string {
    switch (gravidade) {
      case 'Alta': 
        return '#ff6b6b';
      case 'Média': 
        return '#ffff66';
      case 'Baixo': 
        return '#2ecc71';
      default: 
        return '#8e8e93';
    }
  }

  emitirAcao() {
    this.onIniciar.emit(this.ocorrencia);
  }
}