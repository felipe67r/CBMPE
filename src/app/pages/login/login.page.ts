import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonSelectOption
} from '@ionic/angular/standalone';

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
    CommonModule,
    FormsModule
  ]
})
export class LoginPage {
  matricula = '';
  senha = '';
  unidade = '';
  message = '';

  constructor(private router: Router) {}

  onLogin() {
    this.message = '';
    if (!this.matricula.trim() || !this.senha.trim()) {
      this.message = 'Informe matrícula e senha para entrar.';
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  onAdmin() {
    this.message = '';
    if (!this.matricula.trim()) {
      this.message = 'Informe matrícula para acessar o painel administrativo.';
      return;
    }

    this.router.navigate(['/admin']);
  }
}

