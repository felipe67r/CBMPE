import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // <-- IMPORTA O HTTP CLIENT
import {
  IonButton,
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

  // URL do seu back-end Node.js
  private apiUrl = 'http://localhost:3000/login'; 

  // Injeta o HttpClient aqui no construtor
  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.message = '';
    
    if (!this.matricula.trim() || !this.senha.trim()) {
      this.message = 'Informe matrícula e senha para entrar.';
      return;
    }

    // Dados que o formulário vai enviar para o Node.js
    const dadosLogin = {
      matricula: this.matricula,
      senha: this.senha,
      unidade: this.unidade
    };

    // Fazendo a requisição POST para o Back-end
    this.http.post<any>(this.apiUrl, dadosLogin).subscribe({
      next: (resposta) => {
        // Se o back-end responder com sucesso, redireciona
        console.log('Login bem sucedido:', resposta);
        this.router.navigate(['/dashboard']);
      },
      error: (erro) => {
        // Se o back-end der erro (ex: senha errada), mostra a mensagem na tela
        console.error('Erro no login:', erro);
        this.message = erro.error?.mensagem || 'Usuário ou senha incorretos.';
      }
    });
  }

  onAdmin() {
    this.message = '';
    if (!this.matricula.trim()) {
      this.message = 'Informe matrícula para acessar o painel administrativo.';
      return;
    }

    // Se seu painel admin também precisar do back-end, faria algo similar aqui.
    this.router.navigate(['/admin']);
  }
}