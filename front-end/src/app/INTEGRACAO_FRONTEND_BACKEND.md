# Guia de Integração Frontend-Backend

## Configuração do Backend

### Endpoint de Login

**URL**: `POST /auth/login`

**Request**:
```json
{
  "matricula": "string",
  "senha": "string",
  "unidade": "string"
}
```

**Response (200 OK)**:
```json
{
  "usuario": {
    "nome": "string",
    "matricula": "string",
    "unidade": "string"
  },
  "token": "string (opcional)"
}
```

**Response (401)**:
```json
{
  "mensagem": "Usuário ou senha incorretos"
}
```

### Endpoints de Ocorrências

#### GET /ocorrencias
**Parâmetros**: `unidade=string`

**Response**:
```json
[
  {
    "protocolo": "string",
    "natureza": "string",
    "estado": "Despachado|Cancelado|Atendido|Concluído",
    "gravidade": "Baixa|Média|Alta",
    "local": "string",
    "horaPedido": "string",
    "riscosAdicionais": "string",
    "statusLocal": "string"
  }
]
```

#### PUT /ocorrencias/:protocolo
**Request**:
```json
{
  "estado": "string",
  "statusLocal": "string",
  "assinaturaBase64": "string",
  "unidade": "string"
}
```

**Response (200)**:
```json
{
  "protocolo": "string",
  "estado": "Concluído",
  "statusLocal": "string",
  "assinaturaBase64": "string"
}
```

## Variáveis de Ambiente

Criar arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout'
    },
    ocorrencias: {
      list: '/ocorrencias',
      update: '/ocorrencias'
    }
  }
};
```

## CORS Configuration (Node.js Backend)

Adicionar no backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'],
  credentials: true
}));
```

## HttpClient Interceptor (Opcional)

Criar `src/app/services/http.interceptor.ts` para:
- Adicionar token JWT automaticamente
- Tratamento global de erros
- Retry de requisições

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private dataService: DataService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuario = this.dataService.getUsuarioAtual();
    
    if (usuario) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${usuario.matricula}` // ou token se tiver
        }
      });
    }

    return next.handle(req);
  }
}
```

## Testes de Integração

### 1. Teste de Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "matricula": "12345",
    "senha": "senha123",
    "unidade": "unidade-1"
  }'
```

### 2. Teste de Ocorrências

```bash
curl http://localhost:3000/ocorrencias?unidade=unidade-1
```

### 3. Teste de Update

```bash
curl -X PUT http://localhost:3000/ocorrencias/OCR123 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "Concluído",
    "statusLocal": "Atendida com sucesso",
    "unidade": "unidade-1"
  }'
```

## Banco de Dados Mock (Para Desenvolvimento)

Se não tiver um banco real, usar `data.service.ts` para armazenar em:
- `localStorage` - Dados persistentes
- `sessionStorage` - Dados temporários

## Portas Padrão

- **Frontend Angular**: `http://localhost:4200`
- **Frontend Ionic**: `http://localhost:8100`
- **Backend Node.js**: `http://localhost:3000`

## Variáveis de Ambiente Node.js

```bash
# .env (backend)
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:4200,http://localhost:8100
```

## Fluxo de Autenticação

```
1. Usuário preenche login (matricula, senha, unidade)
   ↓
2. Frontend faz POST para /auth/login
   ↓
3. Backend valida credenciais no banco/arquivo
   ↓
4. Se válido: retorna dados do usuário
   Se inválido: retorna erro 401
   ↓
5. Frontend armazena usuário em localStorage via DataService
   ↓
6. Redireciona para /dashboard
   ↓
7. Dashboard carrega ocorrências do usuário
```

## Fluxo de Conclusão

```
1. Usuário está na página de conclusão
   ↓
2. Seleciona status (Concluído, Atendido, Cancelado)
   ↓
3. Adiciona observações (opcional)
   ↓
4. Faz upload de assinatura/foto
   ↓
5. Clica em "Finalizar Ocorrência"
   ↓
6. Modal de confirmação aparece
   ↓
7. Ao confirmar: PUT para /ocorrencias/:protocolo
   ↓
8. Backend atualiza registro
   ↓
9. Frontend redireciona para dashboard
   ↓
10. Ocorrência removida da lista
```

## Erros Comuns

### CORS Error
**Solução**: Configurar CORS no backend

### 404 Not Found
**Solução**: Verificar URL do backend em `data.service.ts`

### 401 Unauthorized
**Solução**: Credentials inválidas ou token expirado

### 500 Internal Server Error
**Solução**: Verificar logs do backend

## Performance Tips

1. **Lazy Loading**: Rotas já estão com lazy loading
2. **Change Detection**: Usar `OnPush` quando possível
3. **RxJS Operators**: Usar `unsubscribe()` ou `takeUntil()`
4. **Bundle Size**: Minify no build production

## Debug

Adicionar em `main.ts` para verbose logging:

```typescript
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(AppComponent, {
    ngZone: new NgZone({ enableLongStackTrace: true })
  })
  .then(moduleRef => {
    const componentRef = moduleRef.injector.get(AppComponent);
    enableDebugTools(componentRef);
  });
```

## Deployment

### Frontend
```bash
ng build --configuration production
# Arquivos em dist/cbmpe/
```

### Backend
```bash
npm install
npm run build
npm start
```

### Docker (Opcional)

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

  frontend:
    build: .
    ports:
      - "8100:8100"
    depends_on:
      - backend
```

## Checklist de Integração

- [ ] Backend rodando em http://localhost:3000
- [ ] Endpoints de login implementados
- [ ] Endpoints de ocorrências implementados
- [ ] CORS configurado
- [ ] DataService importado corretamente
- [ ] HttpClient importado no app
- [ ] Componentes de login testados
- [ ] Componentes de conclusão testados
- [ ] Validações funcionando
- [ ] Mensagens de erro exibidas
- [ ] Armazenamento de usuário funcionando
- [ ] Redirecionamentos funcionando
