// Exemplo de uso dos componentes compartilhados em um módulo de página

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// Importar o SharedModule
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-example-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    SharedModule // Importar aqui para usar os componentes
  ],
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  emailError: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('Página de exemplo carregada');
  }

  // Validar email
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.email && !emailRegex.test(this.email)) {
      this.emailError = 'Email inválido';
    } else {
      this.emailError = '';
    }
  }

  // Enviar formulário
  handleFormSubmit(): void {
    if (this.name && this.email && this.password) {
      console.log('Formulário enviado:', {
        name: this.name,
        email: this.email,
        password: this.password
      });
      // Aqui você faria uma chamada a um serviço, por exemplo
    }
  }

  // Botão reset
  handleReset(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.emailError = '';
    console.log('Formulário resetado');
  }
}
