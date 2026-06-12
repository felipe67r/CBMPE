import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http'; 
=======
import { HttpClient } from '@angular/common/http'; // <-- IMPORTA O HTTP CLIENT
>>>>>>> master
import {
  IonButton,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
<<<<<<< HEAD
  IonGrid,  
  IonRow,   
  IonCol    
=======
  IonGrid,  // <-- ADICIONADO PARA RESPONSIVIDADE
  IonRow,   // <-- ADICIONADO PARA RESPONSIVIDADE
  IonCol    // <-- ADICIONADO PARA RESPONSIVIDADE
>>>>>>> master
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
<<<<<<< HEAD
    IonGrid,  
    IonRow,   
    IonCol,   
=======
    IonGrid,  // <-- ADICIONADO NA LISTA DE IMPORTS DO COMPONENTE
    IonRow,   // <-- ADICIONADO NA LISTA DE IMPORTS DO COMPONENTE
    IonCol,   // <-- ADICIONADO NA LISTA DE IMPORTS DO COMPONENTE
>>>>>>> master
    CommonModule,
    FormsModule
  ]
})
export class LoginPage {
  matricula = '';
  senha = '';
  unidade = '';
  message = '';

<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000/login'; 

=======
  // URL do seu back-end Node.js
  private apiUrl = 'http://localhost:3000/login'; 

  // Injeta o HttpClient aqui no construtor
>>>>>>> master
  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.message = '';
    
    if (!this.matricula.trim() || !this.senha.trim()) {
      this.message = 'Informe matrícula e senha para entrar.';
      return;
    }

<<<<<<< HEAD
    if (!this.unidade) {
      this.message = 'Selecione uma unidade operacional.';
      return;
    }

    console.log('Login simulado com sucesso na unidade:', this.unidade);
    this.router.navigate(['/dashboard']);
=======
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
>>>>>>> master
  }

  onAdmin() {
    this.message = '';
<<<<<<< HEAD
    
    if (!this.matricula.trim()) {
      this.message = 'Informe uma matrícula para acessar o painel administrativo.';
      return;
    }

=======
    if (!this.matricula.trim()) {
      this.message = 'Informe matrícula para acessar o painel administrativo.';
      return;
    }

    // Se seu painel admin também precisar do back-end, faria algo similar aqui.
>>>>>>> master
    this.router.navigate(['/admin']);
  }
}