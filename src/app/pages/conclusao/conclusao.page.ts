import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonText,
  IonSpinner,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle, warning } from 'ionicons/icons';
import { DataService } from 'src/app/services/data.service';
import { Ocorrencia } from 'src/app/core/models/ocorrencia.model';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavButtonComponent } from 'src/app/components/nav-button/nav-button.component';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonText,
    IonSpinner,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonAlert,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainHeaderComponent,
    NavButtonComponent,
    CustomButtonComponent
  ]
})
export class ConclusaoPage implements OnInit {
  conclusaoForm!: FormGroup;
  ocorrenciaAtual: Ocorrencia | null = null;
  usuarioLogado: any = null;
  loading: boolean = false;
  enviando: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showAlert: boolean = false;

  alertButtons: any[] = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'alert-button-cancel'
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      cssClass: 'alert-button-confirm'
    }
  ];

  estadosConclusao = [
    { valor: 'Atendido', label: 'Atendido' },
    { valor: 'Concluído', label: 'Concluído' },
    { valor: 'Cancelado', label: 'Cancelado' }
  ];

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    addIcons({ checkmarkCircle, closeCircle, warning });
    this.initializeForm();
  }

  ngOnInit() {
    this.carregarDados();
  }

  initializeForm() {
    this.conclusaoForm = this.formBuilder.group({
      status: ['Concluído', Validators.required],
      observacoes: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      assinatura: ['', Validators.required]
    });
  }

  carregarDados() {
    this.loading = true;

    // Carrega o usuário logado
    this.dataService.getUsuarioAtual$().subscribe({
      next: (usuario) => {
        this.usuarioLogado = usuario;
        if (!usuario) {
          this.router.navigate(['/login']);
        }
      }
    });

    // Carrega a ocorrência atual
    this.dataService.getOcorrenciaAtual().subscribe({
      next: (ocorrencia) => {
        this.ocorrenciaAtual = ocorrencia;
        this.loading = false;
        
        if (!ocorrencia) {
          this.errorMessage = 'Nenhuma ocorrência em andamento. Selecione uma ocorrência primeiro.';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        }
      },
      error: (erro) => {
        this.loading = false;
        this.errorMessage = 'Erro ao carregar dados da ocorrência';
        console.error(erro);
      }
    });
  }

  onAssinaturaChange(event: any) {
    // Aqui você pode processar a assinatura se necessário
    // Por exemplo, converter para base64
    const arquivo = event.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.conclusaoForm.patchValue({
          assinatura: e.target.result
        });
      };
      reader.readAsDataURL(arquivo);
    }
  }

  finalizarOcorrencia() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.conclusaoForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    if (!this.ocorrenciaAtual) {
      this.errorMessage = 'Nenhuma ocorrência selecionada.';
      return;
    }

    this.showAlert = true;
  }

  confirmarFinalizacao() {
    this.showAlert = false;
    this.enviando = true;

    const { status, observacoes, assinatura } = this.conclusaoForm.value;

    if (!this.ocorrenciaAtual) {
      this.errorMessage = 'Nenhuma ocorrência selecionada.';
      this.enviando = false;
      return;
    }

    // Dados a serem atualizados
    const dadosAtualizacao: Partial<Ocorrencia> = {
      estado: status,
      statusLocal: observacoes || 'Sem observações',
      assinaturaBase64: assinatura
    };

    // Chama o método atualizarOcorrencia com o protocolo
    this.dataService.atualizarOcorrencia(this.ocorrenciaAtual.protocolo, dadosAtualizacao).subscribe({
      next: (resposta) => {
        this.enviando = false;
        this.successMessage = 'Ocorrência finalizada com sucesso!';
        
        setTimeout(() => {
          this.dataService.limparOcorrenciaAtual();
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (erro) => {
        this.enviando = false;
        this.errorMessage = 'Erro ao finalizar a ocorrência. Tente novamente.';
        console.error(erro);
      }
    });
  }

  cancelarFinalizacao() {
    this.showAlert = false;
  }

  onAlertDismiss(event: any) {
    const role = event.detail?.role;
    if (role === 'confirm') {
      this.confirmarFinalizacao();
    } else if (role === 'cancel') {
      this.cancelarFinalizacao();
    }
  }

  voltarDashboard() {
    this.router.navigate(['/dashboard']);
  }

  get statusControl() {
    return this.conclusaoForm.get('status');
  }

  get observacoesControl() {
    return this.conclusaoForm.get('observacoes');
  }

  get assinaturaControl() {
    return this.conclusaoForm.get('assinatura');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Atendido':
        return 'warning';
      case 'Concluído':
        return 'success';
      case 'Cancelado':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Concluído':
        return 'checkmarkCircle';
      case 'Cancelado':
        return 'closeCircle';
      default:
        return 'warning';
    }
  }
}
