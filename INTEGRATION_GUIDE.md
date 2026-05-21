# Guia de Integração - Componentes Compartilhados CBMPE

## 📋 Pré-requisitos

- Projeto CBMPE Angular + Ionic configurado
- Angular 14+ (com suporte a componentes standalone)
- Ionic 7+

## 🚀 Como Integrar

### Opção 1: Em um Módulo Tradicional (NgModule)

Se sua página usa `@NgModule`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyPageComponent } from './my-page.component';
import { MyPageRoutingModule } from './my-page-routing.module';

// Importar SharedModule
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyPageRoutingModule,
    SharedModule // Adicionar aqui
  ]
})
export class MyPageModule { }
```

### Opção 2: Em um Componente Standalone

Se sua página usa `@Component({ standalone: true })`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule // Importar direto
  ],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent {}
```

## 📖 Usando os Componentes

### ButtonComponent

```html
<!-- Botão padrão -->
<app-button 
  label="Clique" 
  color="azul-logo"
  (onClick)="myFunction()">
</app-button>

<!-- Botão submit em formulário -->
<app-button 
  label="Enviar" 
  type="submit"
  color="vermelho-logo">
</app-button>

<!-- Link de navegação -->
<app-button 
  label="Home" 
  type="link"
  link="/home"
  color="amarelo-logo">
</app-button>
```

### FormFieldComponent

```html
<!-- Campo simples -->
<app-form-field
  label="Nome"
  type="text"
  placeholder="Digite seu nome"
  [(ngModel)]="name"
  name="name">
</app-form-field>

<!-- Campo com validação -->
<app-form-field
  label="Email"
  type="email"
  [(ngModel)]="email"
  name="email"
  [required]="true"
  [error]="emailError ? 'Email inválido' : ''">
</app-form-field>

<!-- Campo de senha -->
<app-form-field
  label="Senha"
  type="password"
  [(ngModel)]="password"
  name="password"
  [required]="true">
</app-form-field>
```

### CardComponent

```html
<!-- Card simples -->
<app-card title="Meu Card">
  <p>Conteúdo aqui</p>
</app-card>

<!-- Card com ng-content -->
<app-card title="Operações">
  <div>
    <p>Conteúdo customizado</p>
    <app-button label="Ação" color="azul-logo"></app-button>
  </div>
</app-card>
```

## 🎨 Cores Disponíveis

Todas as cores estão definidas em `src/theme/variables.scss`:

```scss
$amarelo-logo: #fff212;  // Amarelo vibrante
$azul-logo: #3e4095;     // Azul padrão CBMPE
$vermelho-logo: #ed3237; // Vermelho vibrante
$cinza-cbmpe: #717878;   // Cinza neutro
```

Use essas cores como strings no atributo `color`:

```html
<app-button color="amarelo-logo">Amarelo</app-button>
<app-button color="azul-logo">Azul</app-button>
<app-button color="vermelho-logo">Vermelho</app-button>
<app-button color="cinza-cbmpe">Cinza</app-button>
```

## 🔧 Exemplo Completo

**TypeScript (my-page.component.ts):**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';

  validateEmail(): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = this.email && !regex.test(this.email) 
      ? 'Email inválido' 
      : '';
  }

  handleSubmit(): void {
    if (!this.emailError) {
      console.log('Enviando:', { email: this.email, password: this.password });
    }
  }
}
```

**HTML (my-page.component.html):**

```html
<ion-content>
  <app-card title="Login">
    <form (submit)="handleSubmit()">
      <app-form-field
        label="Email"
        type="email"
        [(ngModel)]="email"
        name="email"
        (blur)="validateEmail()"
        [error]="emailError">
      </app-form-field>

      <app-form-field
        label="Senha"
        type="password"
        [(ngModel)]="password"
        name="password">
      </app-form-field>

      <div class="form-actions">
        <app-button 
          label="Entrar" 
          type="submit"
          color="azul-logo"
          [disabled]="!email || !password || !!emailError">
        </app-button>

        <app-button 
          label="Cancelar" 
          type="link"
          link="/home"
          color="cinza-cbmpe">
        </app-button>
      </div>
    </form>
  </app-card>
</ion-content>
```

## ✅ Checklist de Integração

- [ ] SharedModule importado no módulo da página
- [ ] Componentes usados no template
- [ ] Cores aplicadas corretamente
- [ ] Validações implementadas onde necessário
- [ ] Eventos (onClick, blur) vinculados corretamente
- [ ] ngModel binding funciona (two-way binding)

## 📚 Documentação Adicional

- Ver `COMPONENTS_README.md` para detalhes completos
- Ver `EXAMPLE_USAGE.ts` para exemplo de página
- Ver `EXAMPLE_TEMPLATE.html` para exemplo de template

---

**Pronto para usar! Os componentes estão totalmente funcional e integrados ao CBMPE.**
