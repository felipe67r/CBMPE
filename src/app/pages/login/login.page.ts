import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonToolbar,
  IonHeader,
  IonTitle
} from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonToolbar,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomButtonComponent,
    CustomInputComponent
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  unidades = [
    { valor: 'unidade-1', label: 'CBMPE - Centro' },
    { valor: 'unidade-2', label: 'CBMPE - Recife' },
    { valor: 'unidade-3', label: 'CBMPE - Caruaru' },
    { valor: 'unidade-4', label: 'CBMPE - Garanhuns' }
  ];

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Se o usuário já está logado, redireciona
    if (this.dataService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      matricula: ['', [Validators.required, Validators.minLength(4)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      unidade: ['', Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.loading = true;
    const { matricula, senha, unidade } = this.loginForm.value;

    this.dataService.login(matricula, senha, unidade).subscribe({
      next: (resposta) => {
        this.loading = false;
        this.successMessage = 'Login bem-sucedido! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (erro) => {
        this.loading = false;
        console.error('Erro no login:', erro);
        this.errorMessage = erro.error?.mensagem || 'Usuário ou senha incorretos.';
      }
    });
  }

  onAdmin() {
    this.errorMessage = '';
    
    if (!this.loginForm.get('matricula')?.valid) {
      this.errorMessage = 'Informe uma matrícula válida para acessar o painel administrativo.';
      return;
    }

    // Redireciona para o painel admin
    this.router.navigate(['/admin']);
  }

  get matriculaControl() {
    return this.loginForm.get('matricula');
  }

  get senhaControl() {
    return this.loginForm.get('senha');
  }

  get unidadeControl() {
    return this.loginForm.get('unidade');
  }
}