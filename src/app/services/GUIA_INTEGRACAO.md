# 🚀 Guia de Integração - DataService

## Pré-requisitos

### 1. HttpClientModule
O `DataService` depende do `HttpClientModule`. Certifique-se de que está importado no seu módulo principal:

**app.module.ts** (ou app.config.ts se usando standalone)
```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    // ... outros imports
  ]
})
export class AppModule { }
```

### 2. Backend Rodando
O DataService espera que o backend Node.js esteja rodando em:
```
http://localhost:3000
```

Se o backend estiver em outra URL, altere em `data.service.ts`:
```typescript
private readonly API_URL = 'http://seu-dominio:porta';
```

---

## 📦 Estrutura de Arquivos Criados

```
src/app/
├── services/
│   ├── data.service.ts (⭐ Principal)
│   ├── data.service.spec.ts (Testes)
│   ├── data.service.example.ts (Exemplo)
│   ├── DATA_SERVICE_README.md (Documentação)
│   └── IMPLEMENTACAO_RESUMO.md (Este arquivo)
├── core/
│   └── models/
│       └── ocorrencia.model.ts (⬅️ Já existia)
```

---

## 🔌 Como Usar em um Componente

### Exemplo 1: Login
```typescript
import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="matricula" placeholder="Matrícula">
      <input [(ngModel)]="senha" type="password" placeholder="Senha">
      <input [(ngModel)]="unidade" placeholder="Unidade">
      <button type="submit">Entrar</button>
    </form>
    <div *ngIf="error">{{ error }}</div>
  `
})
export class LoginComponent {
  matricula = '';
  senha = '';
  unidade = '';
  error = '';

  constructor(private dataService: DataService) {}

  login() {
    this.dataService.login(this.matricula, this.senha, this.unidade)
      .subscribe({
        next: () => {
          // Navegar para página principal
        },
        error: (err) => {
          this.error = err.message;
        }
      });
  }
}
```

### Exemplo 2: Listagem de Ocorrências
```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Ocorrencia } from './core/models/ocorrencia.model';

@Component({
  selector: 'app-ocorrencias',
  template: `
    <div>
      <h2>Minhas Ocorrências</h2>
      <ion-list>
        <ion-item *ngFor="let oc of ocorrencias$ | async" 
                   (click)="selecionarOcorrencia(oc)">
          <ion-label>
            <h3>{{ oc.protocolo }}</h3>
            <p>{{ oc.natureza }} - {{ oc.gravidade }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </div>
  `
})
export class OcorrenciasComponent implements OnInit {
  ocorrencias$ = this.dataService.getOcorrencias();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Ocorrências carregadas automaticamente via Observable
  }

  selecionarOcorrencia(ocorrencia: Ocorrencia) {
    this.dataService.setOcorrenciaAtual(ocorrencia);
    // Navegar para detalhes da ocorrência
  }
}
```

### Exemplo 3: Detalhes e Conclusão
```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Ocorrencia } from './core/models/ocorrencia.model';

@Component({
  selector: 'app-ocorrencia-detalhe',
  template: `
    <div *ngIf="ocorrencia$ | async as oc">
      <h2>{{ oc.protocolo }}</h2>
      <p>Local: {{ oc.local }}</p>
      <p>Estado: {{ oc.estado }}</p>
      
      <textarea [(ngModel)]="parecer" placeholder="Parecer Final"></textarea>
      
      <button (click)="salvarConclusao()">Concluir Ocorrência</button>
      <div *ngIf="mensagem" class="sucesso">{{ mensagem }}</div>
    </div>
  `
})
export class OcorrenciaDetalheComponent implements OnInit {
  ocorrencia$ = this.dataService.getOcorrenciaAtual();
  parecer = '';
  mensagem = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Ocorrência atual carregada automaticamente
  }

  salvarConclusao() {
    const conclusao = {
      parecer: this.parecer,
      acoesRealizadas: [],
      fotos: []
    };

    this.dataService.salvarConclusao(conclusao).subscribe({
      next: () => {
        this.mensagem = 'Ocorrência concluída com sucesso!';
        // Voltar para listagem
      },
      error: (err) => {
        alert('Erro: ' + err.message);
      }
    });
  }
}
```

---

## 🛡️ Proteção de Rotas

Use um Guard para proteger rotas que requerem autenticação:

```typescript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { DataService } from './services/data.service';

export const authGuard: CanActivateFn = (route, state) => {
  const dataService = inject(DataService);
  const router = inject(Router);

  if (dataService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
```

Use no routing:
```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ocorrencias', component: OcorrenciasComponent, canActivate: [authGuard] },
  { path: 'detalhe', component: OcorrenciaDetalheComponent, canActivate: [authGuard] }
];
```

---

## 🧪 Executar os Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm test -- --code-coverage

# Executar testes de um arquivo específico
ng test --include='**/data.service.spec.ts'
```

---

## 🐛 Troubleshooting

### Erro: "HttpClientModule não foi fornecido"
**Solução:** Adicione `HttpClientModule` ao seu módulo ou app.config

### Erro: "Cannot find module '@angular/common/http'"
**Solução:** Certifique-se de que as versões do Angular estão corretas (20+)

### Erro: "ERR_CONNECTION_REFUSED em localhost:3000"
**Solução:** 
1. Verifique se o backend está rodando
2. Confirme a porta correta
3. Altere `API_URL` se necessário

### Usuário desaparece ao recarregar a página
**Solução:** Isso é normal se o localStorage foi limpo. O DataService persistirá o usuário na próxima navegação.

---

## 📊 Fluxo de Dados

```
┌──────────────────────┐
│   Componente Angular │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│   DataService        │
│  - login()           │
│  - getOcorrencias()  │
│  - salvarConclusao() │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    ↓             ↓
┌─────────┐  ┌──────────────────┐
│localStorage  │  HttpClient      │
│             │                   │
│usuario_cbmpe│  http://localhost│
└─────────┘  │  :3000/           │
             └──────────────────┘
```

---

## 🎯 Próximas Etapas

1. **Integre o DataService** nos seus componentes
2. **Teste o login** com suas credenciais reais
3. **Implemente guards** para rotas protegidas
4. **Configure interceptadores HTTP** (opcional) para token/headers
5. **Adicione loggers** para debugging em produção

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte o `DATA_SERVICE_README.md`
2. Veja o `data.service.example.ts`
3. Verifique os testes em `data.service.spec.ts`

---

**Implementação concluída! Bom desenvolvimento! 🚀**
