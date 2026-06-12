import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { RouterLink } from '@angular/router'; 
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
    RouterLink 
  ]
})
export class TriagemPage implements OnInit {
  gravidadeSelecionada: string = '';
  vitimaSelecionada: string = '';

  // Variáveis do GPS
  latitude: number | null = null;
  longitude: number | null = null;
  carregandoGps: boolean = false;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    addIcons({ arrowBack, arrowDown, location });
  }

  ngOnInit() {
    this.capturarLocalizacao();
  }

  voltar() { 
    this.navCtrl.back(); 
  }

  setGravidade(nivel: string) { 
    this.gravidadeSelecionada = nivel; 
  }

  setVitima(estado: string) { 
    this.vitimaSelecionada = estado; 
  }

  // Corrigido: subTitulo em camelCase para evitar erro de compilação
  async exibirPopupOperacional(titulo: string, mensagem: string, subTitulo: string = 'Aviso do Sistema') {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subTitulo,
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'custom-alert-cbmpe'
    });

    await alert.present();
  }

  // Método de Captura do GPS principal da tela
  capturarLocalizacao() {
    if (!navigator.geolocation) {
      this.exibirPopupOperacional(
        '⚠️ Recurso Ausente',
        'A geolocalização não é suportada pelo seu navegador ou aparelho celular.',
        'Erro de Hardware'
      );
      return;
    }

    this.carregandoGps = true;

    const opcoesGps = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        this.latitude = posicao.coords.latitude;
        this.longitude = posicao.coords.longitude;
        this.carregandoGps = false;
        console.log(`GPS Capturado: Lat ${this.latitude}, Lng ${this.longitude}`);
      },
      (erro) => {
        this.carregandoGps = false;
        this.tratarErroGps(erro);
      },
      opcoesGps
    );
  }

  // Tratamento de erros isolado corretamente dentro do escopo da classe
  private tratarErroGps(erro: GeolocationPositionError) {
    switch(erro.code) {
      case erro.PERMISSION_DENIED:
        this.exibirPopupOperacional(
          '🔒 Permissão Negada',
          'É necessário autorizar o acesso ao GPS para realizar a triagem operacional da ocorrência.',
          'Segurança CBMPE'
        );
        break;
      case erro.POSITION_UNAVAILABLE:
        this.exibirPopupOperacional(
          '📡 Sinal Indisponível',
          'Não foi possível obter o sinal dos satélites de GPS. Vá para um local aberto e tente novamente.',
          'Erro de Sinal'
        );
        break;
      case erro.TIMEOUT:
        this.exibirPopupOperacional(
          '⏱️ Tempo Esgotado',
          'A requisição ao GPS demorou demais. Verifique se o GPS do celular está ativo e tente recapturar.',
          'Timeout de Rede'
        );
        break;
      default:
        this.exibirPopupOperacional(
          '❌ Erro no Módulo GPS',
          'Ocorreu uma falha desconhecida ao tentar obter as coordenadas geográficas.',
          'Erro Crítico'
        );
        break;
    }
  }
} 