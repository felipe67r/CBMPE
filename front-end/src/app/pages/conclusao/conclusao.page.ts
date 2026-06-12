import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> master
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';

import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
<<<<<<< HEAD
=======
import { OcorrenciaService } from 'src/app/services/ocorrencia';
>>>>>>> master

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent]
=======
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent ]
>>>>>>> master
})
export class ConclusaoPage implements OnInit, AfterViewInit {
  
  @ViewChild('signatureCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  
  isCanvasEmpty = true;

<<<<<<< HEAD
  constructor(private navCtrl: NavController) {
=======
  constructor(private navCtrl: NavController,
    private service: OcorrenciaService,
    private router: Router

  ) {
>>>>>>> master
    addIcons({ arrowBack });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.configurarCanvas();
    }, 300);
  }

  configurarCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  @HostListener('window:resize')
  onResize() {
    this.configurarCanvas();
  }

  private obterCoordenadas(event: MouseEvent | TouchEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (event instanceof TouchEvent) {
      if (event.touches.length === 0) return null;
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }


  startDrawing(event: MouseEvent | TouchEvent) {
    const coords = this.obterCoordenadas(event);
    if (!coords) return;

    this.isDrawing = true;
    this.isCanvasEmpty = false; 

    this.ctx.beginPath();
    this.ctx.moveTo(coords.x, coords.y);
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    event.preventDefault(); 

    const coords = this.obterCoordenadas(event);
    if (!coords) return;

    this.ctx.lineTo(coords.x, coords.y);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  limpar() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.isCanvasEmpty = true;
  }

  voltar() {
    this.navCtrl.back();
  }

  finalizarESincronizar() {
<<<<<<< HEAD
    const signatureImgBase64 = this.canvasRef.nativeElement.toDataURL();
    console.log('Assinatura salva com sucesso em Base64!', signatureImgBase64);
  }
=======
    const canvasElement = this.canvasRef.nativeElement;
    const dataUrl = canvasElement.toDataURL('image/png');

    // Verifica se temos um ID antes de tentar enviar
    if (!this.service.ocorrenciaIdAtiva) {
      console.error('Nenhuma ocorrência selecionada!');
      return;
    }

    // O seu serviço já pega o ID de 'ocorrenciaIdAtiva' automaticamente 
    // se você ajustou o método conforme conversamos antes.
    this.service.salvarConclusao({ assinatura: dataUrl }).subscribe({
      next: (res) => {
        console.log('Finalizado com sucesso!', res);
        
        // Limpa o ID após concluir
        this.service.ocorrenciaIdAtiva = null; 
        
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Erro ao salvar no servidor', err);
      }
    });
  }

>>>>>>> master
}