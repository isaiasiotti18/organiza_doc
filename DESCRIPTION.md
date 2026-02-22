# OrganizaDoc

## Visao Geral

**OrganizaDoc** e uma aplicacao Micro-SaaS para organizacao e gestao inteligente de documentos pessoais e empresariais. O sistema resolve um problema critico: documentos vencem, mas usuarios nao possuem rastreamento centralizado, categorizacao ou alertas de vencimento.

### Problema

- Documentos espalhados em pastas no computador, gavetas, Google Drive sem estrutura
- Sem controle de vencimento ou visibilidade sobre prazos
- Prazos perdidos resultam em multas, retrabalho e penalidades
- Ausencia de alertas proativos antes do vencimento

### Solucao

- Repositorio centralizado de documentos
- Categorizacao inteligente com tags personalizaveis
- Rastreamento automatico de vencimento com alertas configuraveis (7, 14 ou 20 dias antes)
- Notificacoes em tempo real via WebSocket
- Notificacoes por email via Edge Functions

---

## Stack Tecnologica

### Frontend

| Tecnologia | Versao | Funcao |
|---|---|---|
| React | 18.3 | Biblioteca UI com composicao de componentes |
| TypeScript | 5.5 | Tipagem estatica e seguranca em tempo de desenvolvimento |
| Vite | 5.4 | Build tool ultra-rapido com HMR |
| React Router | 7.7 | Roteamento SPA com rotas protegidas |
| TanStack React Query | 5.90 | Cache de servidor, revalidacao e sincronizacao de estado |
| React Hook Form | 7.63 | Gerenciamento performatico de formularios |
| Zod | 4.1 | Validacao de schemas com inferencia de tipos |
| Tailwind CSS | 4.1 | CSS utility-first com design tokens |
| shadcn/ui (New York) | - | Componentes acessiveis baseados em Radix UI |
| Recharts | 3.4 | Graficos interativos (pizza, barras) |
| Lucide React | 0.525 | Biblioteca de icones principal |
| Phosphor Icons | 2.1 | Biblioteca de icones complementar |
| Sonner | 2.0 | Notificacoes toast e feedback visual |
| Styled Components | 6.1 | CSS-in-JS para estilizacao |

### Backend e Infraestrutura

| Tecnologia | Funcao |
|---|---|
| Supabase | Backend-as-a-Service (BaaS) completo |
| PostgreSQL 17 | Banco relacional com Row Level Security (RLS) |
| Supabase Auth | Autenticacao JWT com gerenciamento de sessao |
| Supabase Storage | Armazenamento de arquivos em bucket dedicado (max 5MB por arquivo) |
| Supabase Realtime | WebSocket para notificacoes em tempo real |
| Deno Edge Functions | Funcoes serverless para logica backend |
| Resend API | Envio de emails transacionais |

### Desenvolvimento e Qualidade

| Ferramenta | Funcao |
|---|---|
| ESLint 9 | Linting com regras React e TypeScript |
| Prettier | Formatacao de codigo com plugin Tailwind |
| TypeScript strict | Verificacao de tipos em tempo de compilacao |

---

## Funcionalidades

### Gestao de Documentos

- Upload de documentos (max 5MB por arquivo) para Supabase Storage
- Visualizacao via URLs publicas seguras
- Edicao de metadados (titulo, descricao, categoria, data de vencimento)
- Exclusao de documentos com confirmacao
- Filtragem por categoria para acesso rapido
- Cards de documento com data de criacao e vencimento

### Sistema de Categorizacao

**Categorias pre-configuradas:**
- Contratos
- Documentos
- Certidoes
- Faturas
- Boletos
- Comprovantes
- Extratos

**Categorias customizadas:** usuarios podem criar categorias ilimitadas. Contagem automatica de documentos por categoria via funcao RPC.

### Dashboard Analitico

- **Cards de estatisticas:** total de documentos, documentos vencidos (destaque vermelho), documentos vencendo em breve (alerta amarelo, limiar de 5 dias)
- **Grafico pizza interativo:** distribuicao de documentos por categoria com navegacao por clique
- **Lista de vencimentos proximos:** documentos ordenados por urgencia com cores indicativas
- Atualizacao em tempo real dos dados via React Query

### Sistema de Notificacoes

- **Notificacoes in-app em tempo real:** icone de sino com badge de contagem de nao lidas, dropdown com lista de vencimentos, marcar como lida, excluir individual
- **Notificacoes por email:** automatizadas via Edge Functions + Resend API, disparadas com base nas datas de vencimento
- **Limiares de alerta configuraveis:** 7, 14 ou 20 dias antes do vencimento
- **Integracao WebSocket:** atualizacoes em tempo real via Supabase Realtime

### Autenticacao e Seguranca

- Registro e login de usuarios (email/senha)
- Sessoes JWT com refresh automatico
- Rotas protegidas com redirecionamento automatico
- Row Level Security (RLS) - cada usuario ve apenas seus proprios documentos
- Validacao de senha (minimo 8 caracteres, maiuscula, minuscula, numero)
- Validacao de formularios com Zod (formato de email, limite de tamanho de arquivo, campos obrigatorios)

### Gestao de Conta

- Pagina de informacoes da conta
- Pagina de cobranca (preparada para integracao com gateway de pagamento)

---

## Arquitetura do Projeto

```
src/
├── pages/
│   ├── app/
│   │   └── Documents/                # Lista de documentos com filtragem
│   ├── auth/
│   │   ├── LoginForm/                # Pagina de login
│   │   └── RegisterForm/             # Pagina de registro
│   ├── dashboard/                    # Dashboard analitico
│   │   └── components/
│   │       ├── documents-chart.tsx   # Grafico pizza
│   │       ├── statistics-cards.tsx  # Cards de KPI
│   │       ├── expiring-documents.tsx# Vencimentos proximos
│   │       └── header.tsx            # Cabecalho do dashboard
│   └── user/
│       ├── Account/                  # Pagina de conta
│       └── Billing/                  # Pagina de cobranca
│
├── components/
│   ├── ui/                           # Primitivos shadcn/ui
│   ├── DocumentCard/                 # Card de exibicao de documento
│   ├── SubmitNewDocument/            # Formulario de upload
│   ├── AlterInfoDocument/            # Dialog de edicao de metadados
│   ├── NewCategory/                  # Dialog de criacao de categoria
│   ├── Sidebar/                      # Barra lateral de navegacao
│   └── Notifications/                # Icone de sino + dropdown
│
├── hooks/
│   ├── documents/                    # Hooks de documentos (CRUD)
│   ├── categories/                   # Hooks de categorias
│   ├── dashboard/                    # Hooks do dashboard
│   └── notifications/                # Hooks de notificacoes
│
├── lib/
│   └── supabase/                     # Cliente Supabase e funcoes de acesso a dados
│       ├── storage/                  # Upload de arquivos
│       ├── notifications/            # Operacoes de notificacao
│       └── dashboard/                # Consultas do dashboard
│
├── context/
│   └── auth-provider.tsx             # Contexto de autenticacao
│
├── layout/                           # Layouts da aplicacao
├── validations/                      # Schemas Zod de validacao
├── interfaces/                       # Interfaces TypeScript
├── utils/                            # Funcoes utilitarias
│
├── App.tsx                           # Componente raiz com providers
├── Router.tsx                        # Definicoes de rotas
├── protected-route.tsx               # Wrapper de rota protegida
├── env.ts                            # Validacao de variaveis de ambiente
└── main.tsx                          # Ponto de entrada da aplicacao
```

---

## Modelos de Dados

### Document

```typescript
{
  id: string           // UUID
  user_id: string      // FK -> auth.users
  title: string
  description?: string
  file_url: string     // URL do Supabase Storage
  category_id: number  // FK -> categories
  expires_at?: date
  created_at: timestamp
  hidden?: boolean
  category: {
    id: number
    name: string
  }
}
```

### Category

```typescript
{
  id: number           // SERIAL
  user_id: string      // FK -> auth.users
  name: string
  created_at: timestamp
}
```

### Notification

```typescript
{
  id: string           // UUID
  user_id: string      // FK -> auth.users
  document_id: string  // FK -> documents
  message: string
  expires_at: timestamp
  days_left: integer
  viewed: boolean
  deleted: boolean
  created_at: timestamp
}
```

### NotificationSettings

```typescript
{
  user_id: string              // FK -> auth.users
  days_before_expiry: integer  // 7, 14 ou 20
}
```

---

## Fluxos Principais

### Fluxo de Upload de Documento

1. Usuario seleciona arquivo e preenche metadados no formulario
2. Formulario valida com schema Zod (tamanho do arquivo, campos obrigatorios)
3. Mutation de upload disparada via hook `useUploadDocument`
4. Arquivo enviado ao bucket Storage com caminho unico (`{user_id}/{uuid}.ext`)
5. Registro do documento criado no PostgreSQL com URL publica
6. React Query invalida cache de `documents`
7. UI atualiza com o novo documento

### Fluxo de Autenticacao

1. Usuario se registra/faz login via Supabase Auth
2. `AuthProvider` monitora estado de autenticacao com `onAuthStateChange`
3. Token JWT armazenado na sessao Supabase
4. `ProtectedRoute` verifica existencia do usuario antes de renderizar
5. Row Level Security (RLS) garante isolamento de dados no nivel do banco

### Fluxo de Notificacoes em Tempo Real

1. Supabase Realtime estabelece conexao WebSocket com a tabela `notifications`
2. Hook `useNotificationsRealtime` se inscreve ao montar o componente
3. UI atualiza automaticamente quando novas notificacoes sao inseridas
4. Polling como fallback caso WebSocket nao esteja disponivel

---

## Configuracao e Ambiente

### Variaveis de Ambiente

```
VITE_SUPABASE_URL=<url-do-projeto-supabase>
VITE_SUPABASE_ANON_KEY=<chave-anonima-supabase>
```

### Scripts NPM

| Comando | Descricao |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3001) |
| `npm run build` | Verificacao TypeScript + build de producao |
| `npm run lint` | Executa ESLint |
| `npm run preview` | Preview do build de producao |

### Configuracoes Principais

- **Porta de desenvolvimento:** 3001
- **Path alias:** `@/` aponta para `./src/`
- **Estilo shadcn/ui:** New York
- **Cor base:** Neutral

---

## Metricas e Metas

| Metrica | Meta |
|---|---|
| Tempo de descoberta de documento | < 10 segundos |
| Documentos vencidos sem aviso | Zero |
| Tempo de onboarding | < 2 minutos para primeiro upload |
| Disponibilidade | 99.9% (infraestrutura Supabase) |
| Latencia de carregamento de pagina | < 1.5s (com cache React Query) |

---

## Roadmap

- Busca full-text em documentos
- OCR para extracao de texto de PDFs/imagens
- Compartilhamento de documentos entre usuarios
- Planos de assinatura com Stripe
- Aplicativo mobile (React Native/Expo)
- Multi-tenancy para equipes
- Integracao com Google Drive / OneDrive
- Logs de auditoria e historico de acoes
- Metricas avancadas e dashboards temporais
- Exportacao de relatorios em PDF
