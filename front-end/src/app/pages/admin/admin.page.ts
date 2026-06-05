import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, timeOutline, menuOutline, chevronBackOutline } from 'ionicons/icons'; // <-- ADICIONADOS OS DOIS ÍCONES DO BOTÃO RETRÁTIL
import * as L from 'leaflet'; // <-- IMPORTA O LEAFLET QUE VOCÊ INSTALOU

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule]
})
export class AdminPage implements OnInit, AfterViewInit, OnDestroy {
  
  ocorrencias: any[] = [];
  sidebarAtiva: boolean = true; // <-- VARIÁVEL INSERIDA: Controla se a barra lateral está aberta ou recolhida
  private map!: L.Map; // <-- GUARDA A INSTÂNCIA DO MAPA
  private apiUrl = 'http://localhost:3000/ocorrencias'; 

  constructor(private http: HttpClient) {
    // Adicionado menuOutline e chevronBackOutline para os botões de recolher/expandir
    addIcons({ locationOutline, timeOutline, menuOutline, chevronBackOutline });
  }

  ngOnInit() {
    this.buscarOcorrenciasReais();
  }

  // O mapa precisa ser iniciado APÓS a tela carregar os elementos visuais
  ngAfterViewInit() {
    this.inicializarMapa();
  }

  inicializarMapa() {
    // 1. O setTimeout de 100ms garante que o contêiner HTML já tem tamanho definido, evitando áreas cinzas
    setTimeout(() => {
      
      // 2. Configura o centro do mapa nas coordenadas de Recife (-8.05428, -34.8813)
      this.map = L.map('map', {
        center: [-8.05428, -34.8813],
        zoom: 12,
        zoomControl: true
      });

      // 3. Adiciona as imagens das ruas (OpenStreetMap - Gratuito e Público)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(this.map);

      // 4. Força o Leaflet a recalcular as dimensões e renderizar as partes cinzas imediatamente
      this.map.invalidateSize();

      // 5. Desenha os círculos vermelhos (Heatmap de calor) idênticos ao Figma
      // Exemplo 1: Ponto vermelho perto da Boa Vista / Derby
      L.circle([-8.0500, -34.8870], {
        color: '#ed3237',
        fillColor: '#ed3237',
        fillOpacity: 0.5,
        radius: 400 // Tamanho do círculo em metros
      }).addTo(this.map).bindPopup('<b>Foco: Incêndio Residencial</b><br>Rua da Aurora');

      // Exemplo 2: Ponto vermelho em Boa Viagem
      L.circle([-8.1150, -34.8950], {
        color: '#ed3237',
        fillColor: '#ed3237',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(this.map).bindPopup('<b>Foco: Acidente de Trânsito</b><br>Av. Boa Viagem');

    }, 100);
  }

  // FUNÇÃO INSERIDA: Gerencia o recolhimento e força o mapa a se reajustar após a animação de 300ms do CSS
  toggleSidebar() {
    this.sidebarAtiva = !this.sidebarAtiva;
    
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 320); // Tempo levemente maior que a transição CSS para não cortar o cálculo
  }

  buscarOcorrenciasReais() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (dados) => { this.ocorrencias = dados; },
      error: (erro) => {
        console.error('Erro ao buscar ocorrências, usando dados locais.', erro);
        this.ocorrencias = [
          { protocolo: '801', natureza: 'Incêndio Residencial', status: 'Concluído', prioridade: 'Alta', endereco: 'Rua da Aurora, 123 - Boa Vista', horario: '19:14' },
          { protocolo: '802', natureza: 'Acidente de Trânsito', status: 'Concluído', prioridade: 'Média', endereco: 'Av. Boa Viagem, 987 - Pina', horario: '03:00' }
        ];
      }
    });
  }

  gerarPDF(protocolo: string) { console.log('Gerar PDF:', protocolo); }
  openChart(tipo: string) { console.log('Gráfico:', tipo); }

  // Evita vazamento de memória se você sair e voltar para a página
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}