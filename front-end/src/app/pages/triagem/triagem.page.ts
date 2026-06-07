import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { OcorrenciaService } from 'src/app/services/ocorrencia';
import { RouterLink, Router } from '@angular/router'; 

import { addIcons } from 'ionicons';
import { arrowBack, arrowDown, location } from 'ionicons/icons';

@Component({
  selector: 'app-app-triagem',
  templateUrl: './triagem.page.html',
  styleUrls: ['./triagem.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    MainHeaderComponent, 
    RouterLink,
  ]
})
export class TriagemPage implements OnInit {
  gravidadeSelecionada: string = '';
  vitimaSelecionada: string = '';

  constructor(
    private navCtrl: NavController, 
    private service: OcorrenciaService,
    private router: Router
  ) {
    addIcons({ arrowBack, arrowDown, location });
  }

  ngOnInit() {}

  voltar() { this.navCtrl.back(); }
  setGravidade(nivel: string) { this.gravidadeSelecionada = nivel; }
  setVitima(estado: string) { this.vitimaSelecionada = estado; }

  async finalizarTriagem() {
  const dados = { tipo: 'incendio', gravidade: this.gravidadeSelecionada /* ... */ };
  this.service.salvarTriagem(dados).subscribe((res: any) => {
    this.service.ocorrenciaId = res.id; // Guarda o ID para as próximas telas
    this.router.navigate(['/evidencias']);
  });
}

}