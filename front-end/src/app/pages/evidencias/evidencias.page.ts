import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { addIcons } from 'ionicons';
import { arrowBack, arrowDown, cameraOutline, trashOutline } from 'ionicons/icons'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; 
=======
import { RouterLink, Router} from '@angular/router';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { addIcons } from 'ionicons';
import { arrowBack, arrowDown, cameraOutline } from 'ionicons/icons';
import { OcorrenciaService } from 'src/app/services/ocorrencia';
>>>>>>> master

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.page.html',
  styleUrls: ['./evidencias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, RouterLink]
})
export class EvidenciasPage implements OnInit {
<<<<<<< HEAD
  fotosPreview: string[] = [];
  
=======
  fotosPreview: number[] = [1, 2, 3, 4, 5, 6];
>>>>>>> master
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

<<<<<<< HEAD
  constructor(private navCtrl: NavController) {
    addIcons({ arrowBack, arrowDown, cameraOutline, trashOutline });
=======
  constructor(private navCtrl: NavController,
    private service: OcorrenciaService,
    private router: Router
  ) {
    addIcons({ arrowBack, arrowDown, cameraOutline });
>>>>>>> master
  }

  ngOnInit() {}

  voltar() {
    this.navCtrl.back();
  }

<<<<<<< HEAD
  async abrirCamera() {
    try {
      const imagemCapturada = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Camera 
      });

      if (imagemCapturada && imagemCapturada.dataUrl) {
        this.fotosPreview.unshift(imagemCapturada.dataUrl);
      }
    } catch (erro) {
      console.warn('Usuário fechou a câmera ou permissão foi negada:', erro);
    }
  }

  removerFoto(index: number) {
    this.fotosPreview.splice(index, 1);
  }
=======
  abrirCamera() {
    // Lógica do Capacitor Camera Plugin
    console.log('Câmera acionada!');
  }

    async enviarEvidencias() {
    const dados = { detalhamentoTecnico: this.detalhamentoTecnico /* ... */ };
    this.service.salvarEvidencias(dados).subscribe(res => {
      this.router.navigate(['/conclusao']);
    });
  }

>>>>>>> master
}