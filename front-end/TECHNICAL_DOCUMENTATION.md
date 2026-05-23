# Documentação Técnica - Componentes Compartilhados CBMPE

## 📦 Arquitetura

```
src/app/shared/
├── components/
│   ├── button/
│   │   ├── button.component.ts      (Componente com logic)
│   │   ├── button.component.html    (Template com ngIf para types)
│   │   └── button.component.scss    (Estilos com variáveis SCSS)
│   │
│   ├── form-field/
│   │   ├── form-field.component.ts  (ControlValueAccessor implementado)
│   │   ├── form-field.component.html (Usa Ionic IonItem/IonInput)
│   │   └── form-field.component.scss (Estilos de validação)
│   │
│   └── card/
│       ├── card.component.ts        (Componente simples)
│       ├── card.component.html      (Usa ng-content para flexibilidade)
│       └── card.component.scss      (Estilos padronizados)
│
├── shared.module.ts                 (NgModule que agrupa e exporta)
├── COMPONENTS_README.md             (Documentação detalhada)
├── EXAMPLE_USAGE.ts                 (Exemplo de componente página)
├── EXAMPLE_TEMPLATE.html            (Exemplo de template página)
└── EXAMPLE_STYLES.scss              (Exemplo de estilos página)
```

## 🔑 Características Técnicas

### ButtonComponent
- **Tipo**: Standalone component
- **Seletores**: `<app-button>`
- **Implementa**:
  - Conditional rendering (link vs button via ngIf)
  - Dynamic class binding
  - Event emission
  - Type-safe color union type
- **Dependências**: CommonModule, FormsModule, IonButton, RouterModule
- **SCSS**: Usa `darken()` para hover states

### FormFieldComponent
- **Tipo**: Standalone component
- **Implementa**: ControlValueAccessor (para ngModel e FormControl)
- **Seletores**: `<app-form-field>`
- **Features**:
  - Two-way binding ([(ngModel]])
  - Validação com mensagem de erro
  - Floating label do Ionic
  - Required indicator com asterisco vermelho
  - Acessibilidade com labels
- **Provider**: NG_VALUE_ACCESSOR (permite usar em formulários reativos)
- **Dependências**: CommonModule, FormsModule, Ionic components

### CardComponent
- **Tipo**: Standalone component
- **Seletores**: `<app-card>`
- **Features**:
  - Content via @Input ou ng-content
  - Título condicional
  - Estilos padrão com bordas e sombras
  - Border-left azul (branding)
- **Flexibilidade**: Suporta templates customizados via ng-content

## 🎨 Sistema de Cores

**Arquivo**: `src/theme/variables.scss`

```scss
$amarelo-logo: #fff212;
$azul-logo: #3e4095;
$vermelho-logo: #ed3237;
$cinza-cbmpe: #717878;
```

**Uso nos componentes**:
- Variáveis SCSS são interpoladas com `#{}`
- Cores aplicadas via `--background` e `--color` (CSS vars do Ionic)
- Hover states usam função `darken()` do SCSS

## 📋 Imports & Exports

### SharedModule (NgModule)
```typescript
imports: [
  CommonModule,
  FormsModule,
  ButtonComponent,     // Standalone
  FormFieldComponent,  // Standalone
  CardComponent        // Standalone
]

exports: [
  ButtonComponent,
  FormFieldComponent,
  CardComponent
]
```

**Nota**: NgModule pode importar componentes standalone (Angular 14+)

## 🔄 Fluxo de Dados

### ButtonComponent
```
User Input (click)
    ↓
handleClick() method
    ↓
onClick.emit()
    ↓
Parent component receives event
```

### FormFieldComponent
```
User Input (type)
    ↓
ionChange event
    ↓
handleChange() method
    ↓
onChange() callback (ControlValueAccessor)
    ↓
ngModel/FormControl updated
    ↓
Parent component receives value
```

### CardComponent
```
Parent passes @Input(title, content)
        ↓
Template renders conditionally
        ↓
ng-content slot for custom content
        ↓
Applied styles
```

## ✅ Validações Implementadas

### FormFieldComponent
- **Error display**: Condicional via `*ngIf="error"`
- **Required indicator**: Asterisco vermelho via CSS `::after`
- **Border color**: Muda para vermelho se houver erro
- **Type casting**: Aceita qualquer tipo válido de HTML input

### ButtonComponent
- **Disabled state**: Impede click e altera opacidade
- **Type safety**: Union type para color e type props
- **Router navigation**: Usa `[routerLink]` para type='link'

## 🔗 Dependências Externas

```json
{
  "@angular/core": "14+",
  "@angular/common": "14+",
  "@angular/forms": "14+",
  "@angular/router": "14+",
  "@ionic/angular": "7+"
}
```

## 📱 Compatibilidade

- ✅ Angular 14+ (com componentes standalone)
- ✅ Ionic 7+
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS/Android via Ionic)
- ✅ Desktop (Web app)

## 🧪 Testes (Sugestão)

Exemplos de testes que poderiam ser criados:

```typescript
// ButtonComponent.spec.ts
describe('ButtonComponent', () => {
  it('should emit click event', () => {});
  it('should apply correct color class', () => {});
  it('should disable button when disabled=true', () => {});
  it('should navigate when type=link', () => {});
});

// FormFieldComponent.spec.ts
describe('FormFieldComponent', () => {
  it('should implement ControlValueAccessor', () => {});
  it('should show error message', () => {});
  it('should emit onChange events', () => {});
});

// CardComponent.spec.ts
describe('CardComponent', () => {
  it('should render title conditionally', () => {});
  it('should render content via ng-content', () => {});
});
```

## 🚀 Performance

- **Componentes lightweight**: Sem lógica pesada
- **ChangeDetection**: Default (OnPush recomendado para otimização)
- **No external dependencies**: Apenas Ionic e Angular
- **Reusable**: Evita duplicação de código

## 📝 Padrões Utilizados

1. **Component Pattern**: Componentes reutilizáveis e compostos
2. **ControlValueAccessor Pattern**: Para integração com formulários
3. **Content Projection**: ng-content no CardComponent
4. **Module Pattern**: SharedModule centraliza exports
5. **Conditional Rendering**: ngIf/ngTemplate para lógica visual
6. **Event Binding**: @Output e click handlers

---

**Componentes prontos para produção com best practices Angular!**
