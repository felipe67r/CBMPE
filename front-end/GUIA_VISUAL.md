# 🎨 Guia Visual - LOGIN e CONCLUSÃO

## 📱 Tela de LOGIN

```
┌─────────────────────────────────┐
│  CBMPE - Sistema de Ocorrências │ ← Header com título
├─────────────────────────────────┤
│                                 │
│            🚒                   │ ← Logo com animação
│           CBMPE                 │
│  Sistema de Ocorrências         │
│           v1.0.0                │
│                                 │
├─────────────────────────────────┤
│                                 │
│  [ Matrícula Militar ]          │ ← Campo com validação
│   Digite sua matrícula           │
│  _______________________________  │
│                                 │
│  [ Senha ]                      │ ← Campo seguro
│   Digite sua senha               │
│  _______________________________  │
│                                 │
│  [ Unidade ]                    │ ← Selector
│   CBMPE - Centro        ∨       │
│                                 │
│  ┌───────────────────────────┐  │
│  │     🔄 ENTRAR             │  │ ← Botão principal
│  └───────────────────────────┘  │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Painel Administrativo   │    │ ← Botão secundário
│  └─────────────────────────┘    │
│                                 │
│  ⚠️ Usuário ou senha incorretos. │ ← Mensagem de erro
│                                 │
└─────────────────────────────────┘

Cores Utilizadas:
🔵 Azul (#3e4095) - Fundo e destaques
🟡 Amarelo (#fff212) - Acentos
🔴 Vermelho (#ed3237) - Erros
⚫ Cinza (#717878) - Texto secundário
```

---

## 📊 Tela de CONCLUSÃO

```
┌──────────────────────────────────────────────┐
│  Conclusão da Ocorrência                     │ ← Header
├──────────────────────────────────────────────┤
│  Conclusão                                   │
├──────────────────────────────────────────────┤
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ ✓ Dados da Ocorrência                  │  │ ← Card Info
│ ├────────────────────────────────────────┤  │
│ │ Protocolo: OCR20240001                 │  │
│ │ Estado: 🟢 Despachado                  │  │
│ │ Natureza: Incêndio Estrutural          │  │
│ │ Gravidade: 🔴 Alta                     │  │
│ │ Local: Rua das Flores, 123             │  │
│ │ Hora: 2024-01-15 14:30                 │  │
│ │ Riscos: Estrutura comprometida         │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ 📝 Finalizando Ocorrência              │  │ ← Card Formulário
│ ├────────────────────────────────────────┤  │
│ │                                         │  │
│ │ [ Status Final ]                       │  │
│ │  Concluído            ∨                │  │
│ │                                         │  │
│ │ [ Observações ]                        │  │
│ │ Digite observações sobre o             │  │
│ │ atendimento...                         │  │
│ │                                         │  │
│ │ [████░░░░░░] 45 / 500                  │  │
│ │                                         │  │
│ │ [ Assinatura ]                         │  │
│ │ 📸 Selecionar Assinatura/Foto          │  │
│ │                                         │  │
│ │ [Assinatura Carregada] ✓               │  │
│ │ [Pequena preview da assinatura]        │  │
│ │                                         │  │
│ │ ┌────────────────────────────────────┐ │  │
│ │ │ Responsável: João Silva            │ │  │
│ │ │ Matrícula: 1234                    │ │  │
│ │ │ Unidade: CBMPE - Centro            │ │  │
│ │ └────────────────────────────────────┘ │  │
│ │                                         │  │
│ │ ┌───────────────────────────────────┐  │  │
│ │ │ ✓ Finalizar Ocorrência            │  │  │ ← Botão principal
│ │ └───────────────────────────────────┘  │  │
│ │                                         │  │
│ │ ┌───────────────────────────────────┐  │  │
│ │ │ ← Voltar                          │  │  │ ← Botão secundário
│ │ └───────────────────────────────────┘  │  │
│ │                                         │  │
│ └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────┐
│  Voltar ao Dashboard                 │ ← Footer
└──────────────────────────────────────┘

Cores Utilizadas:
🔵 Azul (#3e4095) - Headers e primário
🟢 Verde (#4caf50) - Sucesso
🟡 Amarelo (#fff212) - Avisos
⚫ Cinza (#717878) - Texto
```

---

## 🔄 Fluxo de LOGIN

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ Usuário acessa /login│
└──────┬───────────────┘
       │
       ├─→ Já autenticado? ─→ Redirecionar /dashboard
       │
       ▼
┌──────────────────────┐
│ Exibir formulário    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Usuário preenche     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Validar frontend     │
└──────┬───────────────┘
       │
       ├─→ Inválido? ─→ Mostrar erro
       │
       ▼
┌──────────────────────┐
│ POST /auth/login     │
└──────┬───────────────┘
       │
       ├─→ Erro 401? ─→ Mostrar "Credenciais inválidas"
       │
       ▼
┌──────────────────────┐
│ Salvar em localStorage
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Redirecionar dashboard
└──────┬───────────────┘
       │
       ▼
┌─────────────┐
│     END     │
└─────────────┘
```

---

## 🔄 Fluxo de CONCLUSÃO

```
┌──────────────────┐
│      START       │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ Usuário acessa /conclusao    │
└────────┬─────────────────────┘
         │
         ├─→ Não autenticado? ─→ Redirecionar /login
         │
         ▼
┌──────────────────────────────┐
│ Carregar ocorrência atual    │
└────────┬─────────────────────┘
         │
         ├─→ Nenhuma ocorrência? ─→ Erro + Redirecionar
         │
         ▼
┌──────────────────────────────┐
│ Exibir dados da ocorrência   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Usuário preenche formulário  │
├────────┬─────────────────────┤
│ Status │ Status (obrigatório)│
├────────┼─────────────────────┤
│ Obs    │ Observações (opt)   │
├────────┼─────────────────────┤
│ Ass    │ Assinatura (obrig)  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Validar frontend             │
└────────┬─────────────────────┘
         │
         ├─→ Inválido? ─→ Mostrar erro
         │
         ▼
┌──────────────────────────────┐
│ Clicar "Finalizar Ocorrência"│
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Mostrar modal de confirmação │
└────────┬─────────────────────┘
         │
         ├─→ Cancelar? ─→ Voltar
         │
         ▼
┌──────────────────────────────┐
│ PUT /ocorrencias/:protocolo  │
└────────┬─────────────────────┘
         │
         ├─→ Erro? ─→ Mostrar erro
         │
         ▼
┌──────────────────────────────┐
│ Sucesso!                     │
│ Limpar ocorrência local      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Redirecionar /dashboard      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────┐
│       END        │
└──────────────────┘
```

---

## 🎨 Cores e Tipografia

### Cores Padrão (CBMPE)
```
Primária:  🔵 Azul #3e4095
           ├─ Headers
           ├─ Links
           └─ CTA Buttons

Secundária: 🟡 Amarelo #fff212
            ├─ Acentos
            ├─ Highlights
            └─ Logos

Perigo:    🔴 Vermelho #ed3237
           ├─ Erros
           ├─ Alertas
           └─ Avisos

Neutro:    ⚫ Cinza #717878
           ├─ Texto secundário
           ├─ Borders
           └─ Backgrounds

Sucesso:   🟢 Verde #4caf50
           ├─ Confirmações
           └─ Sucesso
```

### Tipografia
```
Headlines:  Bold, 24-32px
Subtítulos: Semi-bold, 16-20px
Body:       Regular, 14px
Captions:   Regular, 12px

Font: System font (Segoe UI, Helvetica, Arial)
```

---

## 📐 Layouts Responsivos

### Mobile (< 480px)
```
┌──────────────────┐
│    HEADER        │ (altura reduzida)
├──────────────────┤
│                  │
│   CONTEÚDO       │ (100% largura)
│   STACK          │ (vertical)
│   VERTICAL       │
│                  │
├──────────────────┤
│    FOOTER        │
└──────────────────┘
```

### Tablet (480px - 768px)
```
┌──────────────────────────┐
│        HEADER            │ (altura média)
├──────────────────────────┤
│  CONTEÚDO  │  CONTEÚDO  │ (2 colunas)
│    LEFT    │   RIGHT    │
│            │            │
├──────────────────────────┤
│         FOOTER           │
└──────────────────────────┘
```

### Desktop (> 768px)
```
┌──────────────────────────────────┐
│           HEADER                 │ (altura normal)
├──────────────────────────────────┤
│            CONTEÚDO              │ (max-width 900px)
│     │  ITEM 1  │  ITEM 2  │     │ (3 colunas)
│     │  ITEM 3  │  ITEM 4  │     │
│                                  │
├──────────────────────────────────┤
│           FOOTER                 │
└──────────────────────────────────┘
```

---

## ✨ Estados Visuais

### Input Normal
```
┌─ Label ────────────────────┐
│ Digite algo...              │
│_____________________________│
```

### Input com Erro
```
┌─ Label ────────────────────┐
│ Digite algo...              │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (vermelho)
⚠️ Erro: Campo obrigatório
```

### Input Focado
```
┌─ Label ────────────────────┐ (azul)
│ Digite algo...              │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (azul)
```

### Botão Normal
```
┌─────────────────────┐
│   CLIQUE AQUI       │
└─────────────────────┘
```

### Botão Desabilitado
```
┌─────────────────────┐ (opacity 0.6)
│   CLIQUE AQUI       │
└─────────────────────┘
```

### Botão Hover
```
┌─────────────────────┐ (mais escuro)
│   CLIQUE AQUI       │
└─────────────────────┘
```

### Loading State
```
┌─────────────────────┐
│  🔄 PROCESSANDO...  │
└─────────────────────┘
```

---

## 📊 Componentes Visuais

### Card Padrão
```
┌───────────────────────────┐
│ ████ TÍTULO DA CARD      │ (fundo azul)
├───────────────────────────┤
│ Conteúdo da card aqui...  │
│ Pode ter várias linhas    │
└───────────────────────────┘
```

### Badge de Status
```
🔴 Cancelado    🟡 Atendido    🟢 Concluído
```

### Icon + Text
```
✓ Sucesso
⚠️ Aviso
❌ Erro
ℹ️ Informação
```

---

## 🎬 Animações

### Logo Bounce (Login)
```
     🚒
    ▲ ▲
   │   │
   │   │ (sobe e desce continuamente)
   │   │
    ▼ ▼
    🚒
```

### Spinner (Loading)
```
  ↗ ↖
 ← 🔄 →
  ↙ ↖
(rotaciona continuamente)
```

### Transição de Página
```
Página 1  →  [fade out]  →  [fade in]  →  Página 2
```

---

## 🎨 Paleta de Cores Completa

```
Primária:
  🔵 #3e4095 (Azul CBMPE)
  
Secundária:
  🟡 #fff212 (Amarelo CBMPE)
  
Perigo:
  🔴 #ed3237 (Vermelho CBMPE)
  
Neutro:
  ⚫ #717878 (Cinza CBMPE)
  
Suporte:
  🟢 #4caf50 (Verde Sucesso)
  🟠 #ff9800 (Laranja Aviso)
  ⚪ #f5f5f5 (Cinza Light)
  ⚪ #e0e0e0 (Cinza Medium)
```

---

## 📱 Breakpoints Utilizados

```
Extra Small (XS): < 480px
Small (SM):       480px - 768px
Medium (MD):      768px - 1024px
Large (LG):       > 1024px
```

---

**Cada tela foi cuidadosamente projetada para ser intuitiva, clara e profissional!** 🎨✨
