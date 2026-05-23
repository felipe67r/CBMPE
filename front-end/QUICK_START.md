# 🚀 Quick Start - LOGIN e CONCLUSÃO

## 📥 Instalação Rápida

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve
# ou
ionic serve

# Acesso: http://localhost:4200 ou http://localhost:8100
```

---

## 📖 Arquivos Importantes

### Leitura Obrigatória
1. **`RESUMO_IMPLEMENTACAO.md`** - O que foi feito
2. **`INTEGRACAO_FRONTEND_BACKEND.md`** - Como integrar com backend
3. **`CHECKLIST_IMPLEMENTACAO.md`** - Validação da implementação

### Referência
4. **`LOGIN_CONCLUSAO_README.md`** - Guia técnico
5. **`DADOS_EXEMPLO_API.md`** - Exemplos de dados

---

## 🔑 LOGIN

### Localização
- **Componente**: `src/app/pages/login/login.page.ts`
- **Template**: `src/app/pages/login/login.page.html`
- **Estilos**: `src/app/pages/login/login.page.scss`

### Como Usar
```typescript
// Automático - componente já lida com autenticação
// Apenas preencha o formulário e clique em "Entrar"

// Credenciais de teste:
matricula: "1234"
senha: "senha123"
unidade: "unidade-1"
```

### Validações
- ✅ Matrícula: 4+ caracteres
- ✅ Senha: 6+ caracteres
- ✅ Unidade: obrigatória

---

## 📝 CONCLUSÃO

### Localização
- **Componente**: `src/app/pages/conclusao/conclusao.page.ts`
- **Template**: `src/app/pages/conclusao/conclusao.page.html`
- **Estilos**: `src/app/pages/conclusao/conclusao.page.scss`

### Como Usar
1. Fazer login primeiro
2. Selecionar uma ocorrência no dashboard
3. Navegar para /conclusao
4. Preencher o formulário:
   - Status (obrigatório)
   - Observações (opcional, 10-500 chars)
   - Assinatura (obrigatória)
5. Clicar em "Finalizar Ocorrência"
6. Confirmar na modal

### Validações
- ✅ Status: obrigatório
- ✅ Observações: 10-500 chars (opcional)
- ✅ Assinatura: obrigatória

---

## 🎨 Cores do CBMPE

Já estão em `src/theme/variables.scss`:

```scss
$amarelo-logo: #fff212;   // Amarelo
$azul-logo: #3e4095;       // Azul
$vermelho-logo: #ed3237;   // Vermelho
$cinza-cbmpe: #717878;     // Cinza
```

Use em seus estilos:
```scss
@import 'theme/variables.scss';
color: $azul-logo;
background: $amarelo-logo;
```

---

## 🧩 Componentes Reutilizáveis

### CustomButtonComponent
```html
<app-custom-button
  label="Clique aqui"
  color="primary"
  (buttonClick)="handleClick()">
</app-custom-button>
```

### CustomInputComponent
```html
<app-custom-input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  formControlName="email">
</app-custom-input>
```

---

## 📱 DataService

### Login
```typescript
this.dataService.login(matricula, senha, unidade).subscribe(
  (response) => console.log('Logado'),
  (error) => console.error('Erro:', error)
);
```

### Ocorrências
```typescript
// Obter atual
this.dataService.getOcorrenciaAtual().subscribe(ocorrencia => {
  console.log(ocorrencia);
});

// Atualizar
this.dataService.atualizarOcorrencia(protocolo, {
  estado: 'Concluído',
  statusLocal: 'Finalizado'
}).subscribe(...);

// Limpar
this.dataService.limparOcorrenciaAtual();
```

---

## 🔌 Backend

### URL Base
```
http://localhost:3000
```

### Endpoints Necessários

#### POST /auth/login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"matricula":"1234","senha":"senha123","unidade":"unidade-1"}'
```

#### GET /ocorrencias?unidade=unidade-1
```bash
curl http://localhost:3000/ocorrencias?unidade=unidade-1
```

#### PUT /ocorrencias/OCR20240001
```bash
curl -X PUT http://localhost:3000/ocorrencias/OCR20240001 \
  -H "Content-Type: application/json" \
  -d '{"estado":"Concluído","statusLocal":"OK","unidade":"unidade-1"}'
```

---

## ✅ Checklist Rápido

- [ ] Backend rodando em `http://localhost:3000`
- [ ] CORS configurado no backend
- [ ] Endpoints `/auth/login` implementado
- [ ] Endpoint GET `/ocorrencias` implementado
- [ ] Endpoint PUT `/ocorrencias/:protocolo` implementado
- [ ] Banco de dados com usuários de teste
- [ ] Banco de dados com ocorrências de teste
- [ ] Frontend rodando em `http://localhost:4200`
- [ ] Teste login funciona
- [ ] Teste conclusão funciona
- [ ] Dados salvos no backend

---

## 🐛 Troubleshooting

### "Cannot find module DataService"
```bash
# Verificar se arquivo existe
ls src/app/services/data.service.ts

# Se não existir, verificar diretório
ls src/app/services/
```

### "CORS Error"
```javascript
// No backend, adicionar:
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'],
  credentials: true
}));
```

### "Form invalid"
```typescript
// Verificar imports:
import { ReactiveFormsModule } from '@angular/forms';
// Garantir no standalone imports
```

### "Ionic components not rendering"
```typescript
// Garantir imports corretos:
import { IonContent, IonButton } from '@ionic/angular/standalone';
```

---

## 📊 Estrutura de Pastas

```
CBMPE-main/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── custom-button/ ✅
│   │   │   ├── custom-input/ ✅
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── login/ ✅
│   │   │   ├── conclusao/ ✅
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── data.service.ts ✅
│   │   └── theme/
│   │       └── variables.scss ✅
│   └── main.ts
├── RESUMO_IMPLEMENTACAO.md ✅
├── CHECKLIST_IMPLEMENTACAO.md ✅
├── INTEGRACAO_FRONTEND_BACKEND.md ✅
├── DADOS_EXEMPLO_API.md ✅
└── ...
```

---

## 🎯 Próximos Passos

1. Verificar estrutura do backend
2. Rodar backend em `http://localhost:3000`
3. Testar endpoints com curl
4. Testar login no frontend
5. Testar conclusão no frontend
6. Validar dados no banco

---

## 💡 Tips

- Use `ng serve` com `--open` para abrir automaticamente
- Use DevTools do navegador (F12) para debug
- Use `console.log()` para rastrear valores
- Use `ng test` para rodar testes
- Use `ng build --configuration production` para build final

---

## 📞 Referências Rápidas

- **Ionic Docs**: https://ionicframework.com/docs
- **Angular Docs**: https://angular.io/docs
- **RxJS Docs**: https://rxjs.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/

---

**Pronto?** Comece pelo README em `RESUMO_IMPLEMENTACAO.md` 🚀
