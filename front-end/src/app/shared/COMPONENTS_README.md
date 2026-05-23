# Componentes Compartilhados - CBMPE

## Estrutura

```
src/app/shared/
├── components/
│   ├── button/
│   │   ├── button.component.ts
│   │   ├── button.component.html
│   │   └── button.component.scss
│   ├── form-field/
│   │   ├── form-field.component.ts
│   │   ├── form-field.component.html
│   │   └── form-field.component.scss
│   └── card/
│       ├── card.component.ts
│       ├── card.component.html
│       └── card.component.scss
└── shared.module.ts
```

## Componentes Disponíveis

### 1. ButtonComponent

Botão reutilizável com suporte a múltiplas cores e tipos.

**Uso:**
```html
<!-- Botão de ação -->
<app-button 
  label="Clique aqui" 
  color="azul-logo"
  (onClick)="handleClick()">
</app-button>

<!-- Botão de envio -->
<app-button 
  label="Enviar" 
  type="submit"
  color="verde">
</app-button>

<!-- Link de navegação -->
<app-button 
  label="Ir para Home" 
  type="link"
  link="/home"
  color="amarelo-logo">
</app-button>

<!-- Botão desabilitado -->
<app-button 
  label="Desabilitado" 
  [disabled]="true"
  color="cinza-cbmpe">
</app-button>
```

**Propriedades:**
- `@Input() label: string` - Texto do botão
- `@Input() color: 'amarelo-logo' | 'azul-logo' | 'vermelho-logo' | 'cinza-cbmpe'` - Cor do botão (padrão: 'azul-logo')
- `@Input() type: 'button' | 'submit' | 'link'` - Tipo do botão (padrão: 'button')
- `@Input() disabled: boolean` - Desabilita o botão (padrão: false)
- `@Input() link: string` - URL para navegação (usado com type='link')
- `@Output() onClick` - Evento emitido ao clicar no botão

---

### 2. FormFieldComponent

Campo de formulário reutilizável com validação integrada.

**Uso:**
```html
<!-- Campo de texto simples -->
<app-form-field 
  label="Nome" 
  type="text"
  placeholder="Digite seu nome"
  [(ngModel)]="name">
</app-form-field>

<!-- Campo de senha -->
<app-form-field 
  label="Senha" 
  type="password"
  placeholder="Digite sua senha"
  [(ngModel)]="password"
  [required]="true">
</app-form-field>

<!-- Campo com validação -->
<app-form-field 
  label="Email" 
  type="email"
  placeholder="seu@email.com"
  [(ngModel)]="email"
  [required]="true"
  [error]="email && !isValidEmail(email) ? 'Email inválido' : ''">
</app-form-field>
```

**Propriedades:**
- `@Input() label: string` - Rótulo do campo
- `@Input() type: string` - Tipo de input (text, password, email, etc.) (padrão: 'text')
- `@Input() placeholder: string` - Texto de placeholder
- `@Input() required: boolean` - Campo obrigatório (padrão: false)
- `@Input() error: string` - Mensagem de erro (exibida em vermelho)
- `[(ngModel)]` - Two-way binding para o valor do campo

**Implementa ControlValueAccessor** para uso com formulários reativos

---

### 3. CardComponent

Container padrão para agrupar conteúdo.

**Uso:**
```html
<!-- Card com conteúdo via property -->
<app-card 
  title="Informações"
  content="Este é um cartão com informações">
</app-card>

<!-- Card com ng-content -->
<app-card title="Operações">
  <p>Conteúdo customizado aqui</p>
  <app-button label="Ação" color="azul-logo"></app-button>
</app-card>

<!-- Card sem título -->
<app-card>
  <div>Conteúdo livre</div>
</app-card>
```

**Propriedades:**
- `@Input() title: string` - Título do card
- `@Input() content: string` - Conteúdo do card
- `<ng-content>` - Slot para conteúdo customizado

---

## Importar em um Module

No seu `app.module.ts` ou em qualquer módulo que use os componentes:

```typescript
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // ... outros imports
  ]
})
export class MyModule { }
```

## Cores Disponíveis

As cores definidas em `src/theme/variables.scss`:
- **amarelo-logo**: `#fff212` - Amarelo vibrante
- **azul-logo**: `#3e4095` - Azul padrão
- **vermelho-logo**: `#ed3237` - Vermelho vibrante
- **cinza-cbmpe**: `#717878` - Cinza neutro

## Estilos

Todos os componentes usam as variáveis de cor do SCSS e são totalmente estilizados:
- Suporte a Ionic IonButton, IonCard, IonItem, IonLabel, IonInput
- Efeitos hover nos botões
- Validação visual nos campos
- Mensagens de erro em vermelho
- Espaçamento padronizado

---

## Próximos Passos

Para usar os componentes em suas páginas:

1. Importar `SharedModule` no módulo da página
2. Usar os componentes nos templates
3. Adicionar validações específicas no TypeScript da página
