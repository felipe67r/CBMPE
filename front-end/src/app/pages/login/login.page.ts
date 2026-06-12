import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import {
  IonButton,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,  
  IonRow,   
  IonCol    
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonGrid,  
    IonRow,   
    IonCol,   
    CommonModule,
    FormsModule
  ]
})
export class LoginPage {
  matricula = '';
  senha = '';
  unidade = '';
  message = '';

  private apiUrl = 'http://localhost:3000/login'; 

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.message = '';
    
    if (!this.matricula.trim() || !this.senha.trim()) {
      this.message = 'Informe matrícula e senha para entrar.';
      return;
    }

    if (!this.unidade) {
      this.message = 'Selecione uma unidade operacional.';
      return;
    }

    console.log('Login simulado com sucesso na unidade:', this.unidade);
    this.router.navigate(['/dashboard']);
  }

  onAdmin() {
    this.message = '';
    
    if (!this.matricula.trim()) {
      this.message = 'Informe uma matrícula para acessar o painel administrativo.';
      return;
    }

    this.router.navigate(['/admin']);
  }
}