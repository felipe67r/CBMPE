# Componentes Reutilizáveis - Resumo

## ✅ Componentes Criados

### 1. **ButtonComponent**
- `src/app/shared/components/button/`
- Reutilizável com cores de variables.scss
- Suporta: button, submit, link types
- Propriedades: label, color, type, disabled, link, onClick event

### 2. **FormFieldComponent**
- `src/app/shared/components/form-field/`
- Campo com validação integrada
- ControlValueAccessor para formulários reativos
- Propriedades: label, type, placeholder, ngModel, required, error

### 3. **CardComponent**
- `src/app/shared/components/card/`
- Container padrão com ng-content
- Propriedades: title, content

## 📦 Estrutura

```
shared/
├── components/
│   ├── button/
│   │   ├── button.component.ts
│   │   ├── button.component.html
│   │   └── button.component.scss
│   ├── form-field/
│   │   ├── form-field.component.ts
│   │   ├── form-field.component.html
│   │   └── form-field.component.scss
│   ├── card/
│   │   ├── card.component.ts
│   │   ├── card.component.html
│   │   └── card.component.scss
├── shared.module.ts (NgModule exportando todos)
├── COMPONENTS_README.md (Documentação completa)
├── EXAMPLE_USAGE.ts (Exemplo de componente)
├── EXAMPLE_TEMPLATE.html (Exemplo de template)
└── EXAMPLE_STYLES.scss (Exemplo de estilos)
```

## 🎨 Cores Disponíveis

- `amarelo-logo`: #fff212
- `azul-logo`: #3e4095
- `vermelho-logo`: #ed3237
- `cinza-cbmpe`: #717878

## 📝 Como Usar

1. Importar `SharedModule` em seu módulo
2. Usar os componentes no template
3. Cada componente tem Inputs e Outputs específicos

## 🔧 Tecnologias

- Angular 14+ (Standalone & NgModules)
- Ionic Framework
- SCSS com variables
- TypeScript strict mode

---

Ver `COMPONENTS_README.md` para documentação detalhada e exemplos.
