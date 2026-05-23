/**
 * ESTRUTURA DE ARQUIVOS DO DataService
 * 
 * src/app/
 * ├── services/
 * │   ├── 📄 data.service.ts ⭐ (PRINCIPAL - 257 linhas)
 * │   │   ├─ Classe: DataService (Singleton)
 * │   │   ├─ Interface: UsuarioLogado
 * │   │   ├─ Métodos de Autenticação (5 métodos)
 * │   │   ├─ Métodos de Ocorrências (7 métodos)
 * │   │   ├─ Métodos Privados de Armazenamento
 * │   │   └─ Tratamento de Erros HTTP
 * │   │
 * │   ├── 🧪 data.service.spec.ts (220+ linhas de testes)
 * │   │   ├─ Testes de Login
 * │   │   ├─ Testes de Logout
 * │   │   ├─ Testes de Ocorrências
 * │   │   ├─ Testes de Armazenamento
 * │   │   └─ Testes de Erros HTTP
 * │   │
 * │   ├── 📚 DATA_SERVICE_README.md (Documentação completa)
 * │   │   ├─ API Reference
 * │   │   ├─ Exemplos de Uso
 * │   │   ├─ Endpoints Backend
 * │   │   └─ Troubleshooting
 * │   │
 * │   ├── 🚀 GUIA_INTEGRACAO.md (Como usar)
 * │   │   ├─ Pré-requisitos
 * │   │   ├─ Exemplos de Componentes
 * │   │   ├─ Guards de Autenticação
 * │   │   └─ Troubleshooting
 * │   │
 * │   ├── 💡 data.service.example.ts (Componente exemplo)
 * │   │   └─ ExampleUsageComponent com dados mockados
 * │   │
 * │   ├── 🔧 data.service.types.ts (Tipos reutilizáveis)
 * │   │   ├─ UsuarioLogado
 * │   │   ├─ LoginResponse
 * │   │   ├─ ConclusaoPagload
 * │   │   ├─ ErroHttp
 * │   │   ├─ FiltrosOcorrencia
 * │   │   └─ Outras interfaces
 * │   │
 * │   ├── 📋 IMPLEMENTACAO_RESUMO.md (Sumário)
 * │   │   ├─ Arquivos Criados
 * │   │   ├─ Métodos Implementados
 * │   │   └─ Características
 * │   │
 * │   ├── ✅ CHECKLIST.md (Verificação)
 * │   │   ├─ Requisitos Atendidos
 * │   │   ├─ Funcionalidades Implementadas
 * │   │   └─ Status de Validação
 * │   │
 * │   ├── 📖 INDEX.md (Orientação geral)
 * │   │   ├─ Visão Geral
 * │   │   ├─ Como Começar
 * │   │   └─ Próximas Etapas
 * │   │
 * │   └── ⚠️ ARQUIVOS ANTIGOS (para remover)
 * │       ├─ data.ts (vazio - remover)
 * │       └─ data.spec.ts (antigo - remover)
 * │
 * ├── core/
 * │   └── models/
 * │       └── ocorrencia.model.ts (Interface Ocorrencia)
 * │
 * └── ... (outros arquivos do projeto)
 * 
 * 
 * ESTATÍSTICAS
 * ═══════════════════════════════════════════════════════════
 * 
 * Arquivos Criados: 8
 * Linhas de Código: 257 (data.service.ts)
 * Linhas de Testes: 220+ (data.service.spec.ts)
 * Linhas de Documentação: 2000+
 * Total: ~2500 linhas
 * 
 * 
 * SEQUÊNCIA DE LEITURA RECOMENDADA
 * ═══════════════════════════════════════════════════════════
 * 
 * 1. INDEX.md ◀── COMECE AQUI
 *    └─ Visão geral e orientação
 * 
 * 2. CHECKLIST.md
 *    └─ Verificação de requisitos
 * 
 * 3. GUIA_INTEGRACAO.md
 *    └─ Como integrar no seu projeto
 * 
 * 4. DATA_SERVICE_README.md
 *    └─ Documentação da API
 * 
 * 5. data.service.example.ts
 *    └─ Exemplos práticos
 * 
 * 6. data.service.ts
 *    └─ Código-fonte completo
 * 
 * 7. data.service.spec.ts
 *    └─ Testes unitários
 * 
 * 8. data.service.types.ts
 *    └─ Tipos para importar
 * 
 * 
 * DIAGRAMA DE DEPENDÊNCIAS
 * ═══════════════════════════════════════════════════════════
 * 
 *            app.component.ts
 *                    ↓
 *     ┌──────────────┼──────────────┐
 *     ↓              ↓              ↓
 *  login.ts    ocorrencias.ts   detalhe.ts
 *     ├─────────────┼─────────────┤
 *     └──────────────┼──────────────┘
 *                    ↓
 *            DataService ⭐
 *                    ↓
 *         ┌──────────┼──────────┐
 *         ↓          ↓          ↓
 *    HttpClient  BehaviorSubject Storage
 *         ↓          ↓          ↓
 *     Backend    Cache      LocalStorage
 * 
 * 
 * INTERFACE PUBLIC API
 * ═══════════════════════════════════════════════════════════
 * 
 * class DataService {
 *   // ===== AUTENTICAÇÃO =====
 *   login(matricula, senha, unidade): Observable
 *   logout(): void
 *   isLoggedIn(): boolean
 *   getUsuarioAtual(): UsuarioLogado | null
 *   getUsuarioAtual$(): Observable
 * 
 *   // ===== OCORRÊNCIAS =====
 *   getOcorrenciaAtual(): Observable
 *   setOcorrenciaAtual(oc): void
 *   limparOcorrenciaAtual(): void
 *   getOcorrenciaAtualSync(): Ocorrencia | null
 *   getOcorrencias(): Observable<Ocorrencia[]>
 *   salvarConclusao(conclusao): Observable
 *   atualizarOcorrencia(protocolo, dados): Observable
 * 
 *   // ===== PRIVADOS =====
 *   private armazenarUsuario(): void
 *   private obterUsuarioArmazenado(): void
 *   private armazenarOcorrencia(): void
 *   private obterOcorrenciaArmazenada(): void
 *   private carregarEstadoInicial(): void
 *   private tratarErroHttp(): void
 * }
 * 
 * 
 * ENDPOINTS DO BACKEND
 * ═══════════════════════════════════════════════════════════
 * 
 * POST /auth/login
 *   ├─ Entrada: { matricula, senha, unidade }
 *   └─ Saída: { usuario: { nome, matricula, unidade } }
 * 
 * GET /ocorrencias?unidade={unidade}
 *   └─ Saída: Ocorrencia[]
 * 
 * PUT /ocorrencias/{protocolo}
 *   ├─ Entrada: Partial<Ocorrencia>
 *   └─ Saída: Ocorrencia
 * 
 * POST /ocorrencias/conclusao
 *   ├─ Entrada: { protocolo, parecer, acoesRealizadas, ... }
 *   └─ Saída: { sucesso: boolean }
 * 
 * 
 * STORAGE KEYS
 * ═══════════════════════════════════════════════════════════
 * 
 * localStorage:
 *   key: 'usuario_cbmpe'
 *   value: { nome, matricula, unidade }
 *   duração: até logout ou limpeza do navegador
 * 
 * sessionStorage:
 *   key: 'ocorrencia_cbmpe'
 *   value: { protocolo, natureza, estado, ... }
 *   duração: até fechar a abaxar do navegador
 * 
 * 
 * TRATAMENTO DE ERROS
 * ═══════════════════════════════════════════════════════════
 * 
 * 401 → Logout + "Credenciais inválidas"
 * 403 → "Acesso negado"
 * 404 → "Recurso não encontrado"
 * 500 → "Erro no servidor"
 * 0   → "Erro de conexão"
 * 
 * 
 * TESTES INCLUSOS
 * ═══════════════════════════════════════════════════════════
 * 
 * ✓ Login bem-sucedido
 * ✓ Erro 401 (credenciais)
 * ✓ Logout e limpeza
 * ✓ Verificação de autenticação
 * ✓ Obtenção de usuário
 * ✓ Ocorrências (get/set/limpar)
 * ✓ Salvamento de conclusão
 * ✓ Busca de ocorrências
 * ✓ Atualização de ocorrência
 * ✓ Persistência de dados
 * 
 * 
 * PRÓXIMAS FEATURES (SUGESTÕES)
 * ═══════════════════════════════════════════════════════════
 * 
 * • Interceptador para tokens JWT
 * • Refresh automático de tokens
 * • Cache com invalidação
 * • Retry logic com backoff
 * • Logging estruturado
 * • Offline support
 * • Sincronização de dados
 * • Push notifications
 * 
 * 
 * COMPATIBILIDADE
 * ═══════════════════════════════════════════════════════════
 * 
 * ✓ Angular 20+
 * ✓ Ionic 8+
 * ✓ RxJS 7.8+
 * ✓ TypeScript 5.9+
 * ✓ Navegadores modernos
 * ✓ Dispositivos móveis
 * 
 * 
 * PERFORMANCE
 * ═══════════════════════════════════════════════════════════
 * 
 * • BehaviorSubject para atualizações reativas
 * • Armazenamento em memória (sem BD)
 * • Sem polling ou sondagem
 * • Requisições HTTP otimizadas
 * • Tratamento de erros sem delays
 * 
 * 
 * SEGURANÇA
 * ═══════════════════════════════════════════════════════════
 * 
 * ✓ Logout automático em 401
 * ✓ Validação de tipo (TypeScript)
 * ✓ Tratamento de null/undefined
 * ✓ HTTPS recomendado em produção
 * ✓ Proteção contra XSS (Angular)
 * ✓ Sem hardcode de senhas
 * 
 */
