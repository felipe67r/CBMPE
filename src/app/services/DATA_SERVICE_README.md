# DataService - Documentação

O `DataService` é responsável por gerenciar todo o estado da aplicação CBMPE, incluindo autenticação de usuários e gerenciamento de ocorrências.

## Localização
```
src/app/services/data.service.ts
```

## Recursos

### 1. Autenticação

#### `login(matricula: string, senha: string, unidade: string): Observable<any>`
Realiza o login do usuário. Armazena o usuário em localStorage automaticamente.

**Exemplo:**
```typescript
this.dataService.login('12345', 'senha123', 'Bombeiros Centro').subscribe(
  (response) => {
    console.log('Login bem-sucedido');
  },
  (error) => {
    console.error('Erro:', error.message);
  }
);
```

#### `logout(): void`
Realiza o logout e limpa todos os dados armazenados.

```typescript
this.dataService.logout();
```

#### `isLoggedIn(): boolean`
Verifica se há um usuário atualmente autenticado.

```typescript
if (this.dataService.isLoggedIn()) {
  // Usuário está logado
}
```

#### `getUsuarioAtual(): UsuarioLogado | null`
Retorna o usuário atualmente logado (sem Observable).

```typescript
const usuario = this.dataService.getUsuarioAtual();
console.log(usuario?.nome);
```

#### `getUsuarioAtual$(): Observable<UsuarioLogado | null>`
Retorna um Observable do usuário atual para bindings reativos.

```typescript
this.dataService.getUsuarioAtual$().subscribe(usuario => {
  if (usuario) {
    console.log('Usuário:', usuario.nome);
  }
});
```

---

### 2. Gerenciamento de Ocorrências

#### `getOcorrenciaAtual(): Observable<Ocorrencia | null>`
Obtém um Observable da ocorrência atualmente selecionada.

```typescript
this.dataService.getOcorrenciaAtual().subscribe(ocorrencia => {
  if (ocorrencia) {
    console.log('Protocolo:', ocorrencia.protocolo);
  }
});
```

#### `setOcorrenciaAtual(ocorrencia: Ocorrencia): void`
Define uma ocorrência como a atual. Armazena em sessionStorage.

```typescript
this.dataService.setOcorrenciaAtual(ocorrenciaEscolhida);
```

#### `getOcorrenciaAtualSync(): Ocorrencia | null`
Obtém a ocorrência atual de forma síncrona (sem Observable).

```typescript
const ocorrencia = this.dataService.getOcorrenciaAtualSync();
```

#### `limparOcorrenciaAtual(): void`
Limpa a ocorrência atual e remove do sessionStorage.

```typescript
this.dataService.limparOcorrenciaAtual();
```

#### `getOcorrencias(): Observable<Ocorrencia[]>`
Busca todas as ocorrências da unidade do usuário logado do backend.

```typescript
this.dataService.getOcorrencias().subscribe(
  (ocorrencias) => {
    console.log('Total de ocorrências:', ocorrencias.length);
  },
  (error) => {
    console.error('Erro ao buscar ocorrências:', error.message);
  }
);
```

#### `atualizarOcorrencia(protocolo: string, dados: Partial<Ocorrencia>): Observable<Ocorrencia>`
Atualiza uma ocorrência específica no backend.

```typescript
this.dataService.atualizarOcorrencia('OC001', { estado: 'Atendido' })
  .subscribe(
    (ocorrenciaAtualizada) => {
      console.log('Ocorrência atualizada:', ocorrenciaAtualizada);
    }
  );
```

#### `salvarConclusao(conclusao: any): Observable<any>`
Salva a conclusão de uma ocorrência.

**Exemplo:**
```typescript
const conclusao = {
  protocolo: 'OC001',
  parecer: 'Caso resolvido com sucesso',
  acoesRealizadas: ['Resgate de vítimas', 'Controle de incêndio'],
  fotos: [/* base64 images */],
  assinaturaBase64: '...'
};

this.dataService.salvarConclusao(conclusao).subscribe(
  (response) => {
    console.log('Conclusão salva com sucesso');
  },
  (error) => {
    console.error('Erro:', error.message);
  }
);
```

---

## Interface UsuarioLogado

```typescript
interface UsuarioLogado {
  nome: string;
  matricula: string;
  unidade: string;
}
```

---

## Armazenamento

### localStorage
- **Chave**: `usuario_cbmpe`
- **Conteúdo**: Dados do usuário autenticado
- **Duração**: Persiste até logout ou limpeza manual do navegador

### sessionStorage
- **Chave**: `ocorrencia_cbmpe`
- **Conteúdo**: Ocorrência atualmente selecionada
- **Duração**: Persiste durante a sessão do navegador

---

## Tratamento de Erros

O DataService trata automaticamente erros HTTP com mensagens amigáveis:

| Código | Mensagem |
|--------|----------|
| 401 | "Credenciais inválidas. Verifique matrícula e senha." |
| 403 | "Acesso negado. Você não tem permissão..." |
| 404 | "Recurso não encontrado." |
| 500 | "Erro no servidor. Tente novamente mais tarde." |
| 0 (timeout) | "Erro de conexão. Verifique sua conexão..." |

---

## Configuração do App

Para usar o DataService, certifique-se de que `HttpClientModule` está importado no seu módulo:

```typescript
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [DataService]
})
export class AppModule { }
```

---

## Endpoints esperados do Backend

O DataService espera os seguintes endpoints em `http://localhost:3000`:

- `POST /auth/login` - Autenticação
- `GET /ocorrencias?unidade={unidade}` - Listar ocorrências
- `PUT /ocorrencias/{protocolo}` - Atualizar ocorrência
- `POST /ocorrencias/conclusao` - Salvar conclusão

---

## Exemplo Completo de Uso

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  usuario$ = this.dataService.getUsuarioAtual$();
  ocorrencia$ = this.dataService.getOcorrenciaAtual();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Login
    this.dataService.login('12345', 'senha', 'Bombeiros Centro').subscribe();

    // Buscar ocorrências
    this.dataService.getOcorrencias().subscribe(ocorrencias => {
      console.log(ocorrencias);
    });
  }

  selecionarOcorrencia(ocorrencia: any) {
    this.dataService.setOcorrenciaAtual(ocorrencia);
  }

  finalizarOcorrencia() {
    const conclusao = {
      parecer: 'Concluído',
      acoesRealizadas: []
    };
    this.dataService.salvarConclusao(conclusao).subscribe();
  }

  fazerLogout() {
    this.dataService.logout();
  }
}
```

---

## Testes

O arquivo `data.service.spec.ts` contém testes unitários cobrindo todos os métodos principais. Execute com:

```bash
ng test
```

---

## Notas

- O DataService é um serviço Singleton (providedIn: 'root')
- Todos os dados sensíveis (usuário) são validados antes de serem armazenados
- Erros HTTP são tratados com fallback para mensagens genéricas amigáveis
- A URL base do backend pode ser alterada na propriedade `API_URL`
