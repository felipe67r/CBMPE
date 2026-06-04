import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { addIcons } from 'ionicons';
import { arrowBack, arrowDown, cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.page.html',
  styleUrls: ['./evidencias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, RouterLink]
})
export class EvidenciasPage implements OnInit {
  fotosPreview: number[] = [1, 2, 3, 4, 5, 6];
  detalhamentoTecnico: string = '';
  agenteExtintor: string = '';
  mangueiras: string = '';
  protecaoRespiratoria: string = '';
  arrombamento: string = '';
  suporteBasicoVida: string = '';
  transporte: string = '';
  curativosEConsumiveis: string = '';
  diagnostico: string = '';
  ferramentasHidraulicas: string = '';
  iluminacaoEnergia: string = '';
  superficie: string = '';
  mergulho: string = '';
  cordas: string = '';
  seguranca: string = '';

  constructor(private navCtrl: NavController) {
    addIcons({ arrowBack, arrowDown, cameraOutline });
  }

  ngOnInit() {}

  voltar() {
    this.navCtrl.back();
  }

  abrirCamera() {
    // Lógica do Capacitor Camera Plugin
    console.log('Câmera acionada!');
  }
}