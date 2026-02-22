<p align="center">
  <img src="src/assets/logo_organizadoc.svg" alt="OrganizaDoc Logo" width="80" />
</p>

<h1 align="center">OrganizaDoc</h1>

<p align="center">
  <strong>Micro-SaaS de organização inteligente de documentos pessoais e empresariais</strong>
</p>

<p align="center">
  <a href="#funcionalidades">Funcionalidades</a> &bull;
  <a href="#stack-tecnológica">Stack</a> &bull;
  <a href="#arquitetura">Arquitetura</a> &bull;
  <a href="#resultados">Resultados</a> &bull;
  <a href="#começando">Começando</a> &bull;
  <a href="#roadmap">Roadmap</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-BaaS-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

## O Problema

Documentos vencem. Contratos expiram. Certidões perdem validade. E quando você percebe, já perdeu o prazo e está pagando multa, refazendo processo ou correndo atrás de segunda via.

Pessoas e pequenas empresas gerenciam documentos em pastas soltas no computador, gavetas físicas ou, na melhor das hipóteses, um Google Drive sem estrutura. Não há controle de vencimento, não há categorização, não há visibilidade.

## A Solução

**OrganizaDoc** é um micro-SaaS que centraliza, categoriza e monitora documentos com alertas inteligentes de vencimento. Faça upload, organize por categoria, defina datas de expiração e receba notificações antes que qualquer documento expire.

---

## Funcionalidades

### Gestao de Documentos
- **Upload seguro** com armazenamento em cloud (Supabase Storage, limite de 5MB por arquivo)
- **Visualizacao instantanea** de documentos via URL publica protegida
- **Edicao de metadados** -- titulo, descricao, categoria e data de vencimento
- **Exclusao** com confirmacao para prevenir acidentes
- **Filtragem por categoria** para localizar documentos rapidamente

### Categorias Personalizaveis
- Categorias pre-configuradas: Contratos, Documentos, Certidoes, Faturas, Boletos, Comprovantes, Extratos
- Criacao de categorias customizadas por usuario
- Contagem automatica de documentos por categoria via funcao RPC no banco

### Dashboard Analitico
- **Total de documentos** armazenados
- **Documentos vencidos** com destaque visual em vermelho
- **Documentos proximos ao vencimento** com alerta amarelo (threshold de 5 dias)
- **Grafico de pizza interativo** (Recharts) mostrando distribuicao por categoria
- **Lista de proximos vencimentos** com niveis de urgencia por cor

### Sistema de Notificacoes
- **Notificacoes em tempo real** via Supabase Realtime
- **Sino de notificacao** com badge de contagem de nao lidas
- **Configuracao de antecedencia** -- 7, 14 ou 20 dias antes do vencimento
- **Marcar como lida** e excluir notificacoes individuais
- **Notificacoes por e-mail** automaticas via Edge Function + Resend API

### Autenticacao e Seguranca
- Registro e login com e-mail/senha via Supabase Auth
- Sessoes JWT com refresh automatico
- Rotas protegidas com redirecionamento automatico
- Row Level Security (RLS) no PostgreSQL -- cada usuario ve apenas seus dados
- Validacao rigorosa de formularios com Zod (senha forte, limites de caracteres, tamanho de arquivo)

### Gestao de Conta
- Pagina de informacoes da conta
- Pagina de billing (preparada para integracao com gateway de pagamento)

---

## Stack Tecnologica

### Frontend

| Tecnologia | Versao | Funcao |
|---|---|---|
| **React** | 18.3 | Biblioteca UI com componentizacao |
| **TypeScript** | 5.5 | Tipagem estatica e seguranca em tempo de desenvolvimento |
| **Vite** | 5.4 | Build tool com HMR ultra-rapido |
| **React Router** | 7.7 | Roteamento SPA com rotas protegidas |
| **TanStack React Query** | 5.90 | Cache de servidor, revalidacao e sincronizacao de estado |
| **React Hook Form** | 7.63 | Gerenciamento de formularios performatico |
| **Zod** | 4.1 | Validacao de schemas com inferencia de tipos |

### UI & Estilizacao

| Tecnologia | Funcao |
|---|---|
| **shadcn/ui** (New York) | Componentes acessiveis baseados em Radix UI |
| **Tailwind CSS** 4.1 | Utility-first CSS com design system consistente |
| **Recharts** 3.4 | Graficos interativos para o dashboard |
| **Lucide React** | Biblioteca de icones principal |
| **Phosphor Icons** | Icones complementares |
| **Sonner** | Toasts e feedback visual |

### Backend & Infraestrutura

| Tecnologia | Funcao |
|---|---|
| **Supabase** | Backend-as-a-Service completo |
| **PostgreSQL** 17 | Banco de dados relacional com RLS |
| **Supabase Auth** | Autenticacao JWT com gerenciamento de sessao |
| **Supabase Storage** | Armazenamento de arquivos em bucket dedicado |
| **Supabase Realtime** | WebSocket para notificacoes em tempo real |
| **Deno Edge Functions** | Funcoes serverless para logica de backend |
| **Resend** | Envio de e-mails transacionais |

### Qualidade de Codigo

| Ferramenta | Funcao |
|---|---|
| **ESLint** 9 | Linting com regras React e TypeScript |
| **Prettier** | Formatacao automatica com plugin Tailwind |
| **TypeScript strict** | Checagem de tipos em tempo de compilacao |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (SPA)                      │
│                                                         │
│  React 18 + TypeScript + Vite                           │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Pages   │  │  Hooks   │  │  Context (Auth)       │  │
│  │ Dashboard │──│ React    │──│  AuthProvider         │  │
│  │ Documents │  │ Query    │  │  ProtectedRoute       │  │
│  │ Auth     │  │          │  └───────────────────────┘  │
│  │ User     │  │          │                             │
│  └──────────┘  └────┬─────┘                             │
│                     │                                   │
│              ┌──────┴──────┐                            │
│              │  Supabase   │                            │
│              │  Client SDK │                            │
│              └──────┬──────┘                            │
└─────────────────────┼───────────────────────────────────┘
                      │ HTTPS / WebSocket
┌─────────────────────┼───────────────────────────────────┐
│                SUPABASE (Backend)                        │
│                     │                                   │
│  ┌──────────────────┼──────────────────────────┐        │
│  │            PostgreSQL 17                    │        │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────┐ │        │
│  │  │ documents  │ │ categories │ │  users   │ │        │
│  │  │ notifications│ │ notif_    │ │ email_   │ │        │
│  │  │            │ │ settings   │ │ notifs   │ │        │
│  │  └────────────┘ └────────────┘ └──────────┘ │        │
│  │         Row Level Security (RLS)            │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
│  ┌─────────────────┐  ┌────────────────────────┐        │
│  │  Supabase       │  │  Edge Functions (Deno) │        │
│  │  Storage        │  │  - dashboard-overview  │        │
│  │  (documents     │  │  - send-expiry-emails  │        │
│  │   bucket)       │  │         │              │        │
│  └─────────────────┘  └─────────┼──────────────┘        │
│                                 │                       │
│  ┌──────────────────┐    ┌──────┴──────┐                │
│  │  Supabase        │    │  Resend API │                │
│  │  Realtime (WS)   │    │  (e-mails)  │                │
│  └──────────────────┘    └─────────────┘                │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Componente  ──>  React Query Hook  ──>  Supabase Client  ──>  PostgreSQL
    ^                                                             │
    └──────────────  Cache + Revalidacao  <────────────────────────┘
```

### Estrutura do Projeto

```
src/
├── pages/                    # Paginas da aplicacao
│   ├── app/Documents/        #   Listagem e filtragem de documentos
│   ├── auth/                 #   Login e registro
│   ├── dashboard/            #   Dashboard com estatisticas e graficos
│   └── user/                 #   Conta e billing
├── components/               # Componentes reutilizaveis
│   ├── ui/                   #   shadcn/ui (Button, Card, Dialog, etc.)
│   ├── Sidebar/              #   Navegacao lateral
│   ├── DocumentCard/         #   Card de documento
│   ├── SubmitNewDocument/    #   Formulario de upload
│   ├── NewCategory/          #   Criacao de categoria
│   ├── AlterInfoDocument/    #   Edicao de documento
│   └── Notifications/        #   Sistema de notificacoes
├── hooks/                    # Custom hooks (React Query)
│   ├── documents/            #   CRUD de documentos
│   ├── categories/           #   Operacoes de categorias
│   ├── dashboard/            #   Dados do dashboard
│   └── notifications/        #   Operacoes de notificacoes
├── lib/                      # Bibliotecas e clientes
│   └── supabase/             #   Funcoes de acesso ao Supabase
├── context/                  # React Context (AuthProvider)
├── layout/                   # Layouts (Default, Auth, User)
├── validations/              # Schemas Zod
├── interfaces/               # Tipos TypeScript
└── utils/                    # Funcoes utilitarias
```

---

## Resultados

### Resultados Esperados

| Metrica | Objetivo |
|---|---|
| **Tempo para encontrar um documento** | < 10 segundos (vs. minutos em pastas manuais) |
| **Documentos vencidos sem aviso** | Zero -- alertas proativos de 7 a 20 dias |
| **Tempo de onboarding** | < 2 minutos para primeiro upload |
| **Disponibilidade** | 99.9% (infraestrutura Supabase) |
| **Latencia de carregamento** | < 1.5s com cache React Query |

### Resultados Atingidos

| Entrega | Status |
|---|---|
| Sistema completo de autenticacao (registro, login, sessoes JWT) | Concluido |
| Upload, visualizacao, edicao e exclusao de documentos | Concluido |
| Categorias pre-definidas + customizaveis por usuario | Concluido |
| Dashboard analitico com graficos interativos | Concluido |
| Notificacoes em tempo real (in-app via WebSocket) | Concluido |
| Notificacoes por e-mail (Edge Function + Resend) | Concluido |
| Configuracao de antecedencia de alertas (7/14/20 dias) | Concluido |
| Rotas protegidas com RLS por usuario | Concluido |
| Interface responsiva (mobile, tablet, desktop) | Concluido |
| Validacao robusta de formularios (Zod) | Concluido |

### Diferenciais Tecnicos

- **Zero backend custom** -- toda a infraestrutura e gerenciada pelo Supabase, reduzindo custo operacional e complexidade de deploy
- **Real-time nativo** -- notificacoes via WebSocket sem polling, sem servidor adicional
- **Type-safe end-to-end** -- TypeScript no frontend + Zod para validacao em runtime
- **Cache inteligente** -- React Query gerencia stale data, revalidacao em foco e deduplicacao de requests
- **Seguranca por design** -- RLS no banco garante isolamento de dados sem middleware customizado

---

## Comecando

### Pre-requisitos

- **Node.js** >= 18
- **npm** ou **yarn**
- Conta no **[Supabase](https://supabase.com)** (tier gratuito funciona)

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/seu-usuario/organiza-doc.git
cd organiza-doc

# Instale as dependencias
npm install

# Configure as variaveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Supabase:
#   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
#   VITE_SUPABASE_ANON_KEY=sua-anon-key

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicacao estara disponivel em `http://localhost:3001`.

### Configuracao do Supabase

1. Crie um projeto no [Supabase Dashboard](https://app.supabase.com)
2. Execute as migrations do banco (tabelas: `documents`, `categories`, `notifications`, `notification_settings`, `email_notifications`)
3. Crie o bucket de storage `organizadoc-bkt-documents`
4. Configure as politicas de RLS para isolamento por `user_id`
5. Deploy das Edge Functions:

```bash
# Dashboard overview
supabase functions deploy dashboard-overview

# Notificacoes por e-mail (requer RESEND_API_KEY)
supabase functions deploy send-expiry-notification-emails
```

### Scripts Disponiveis

| Comando | Descricao |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3001) |
| `npm run build` | Compila TypeScript e gera build de producao |
| `npm run preview` | Preview da build de producao |
| `npm run lint` | Executa ESLint no projeto |

---

## Modelo de Dados

```sql
-- Tabelas principais (simplificado)

documents (
  id          UUID PRIMARY KEY,
  user_id     UUID REFERENCES auth.users,
  title       TEXT NOT NULL,
  description TEXT,
  file_url    TEXT NOT NULL,
  category_id INTEGER REFERENCES categories,
  expires_at  TIMESTAMPTZ,
  hidden      BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
)

categories (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES auth.users,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
)

notifications (
  id          UUID PRIMARY KEY,
  user_id     UUID REFERENCES auth.users,
  document_id UUID REFERENCES documents,
  message     TEXT,
  expires_at  TIMESTAMPTZ,
  days_left   INTEGER,
  viewed      BOOLEAN DEFAULT false,
  deleted     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
)

notification_settings (
  user_id            UUID REFERENCES auth.users,
  days_before_expiry INTEGER DEFAULT 7
)
```

---

## Roadmap

- [ ] Busca full-text em documentos (titulo + descricao)
- [ ] OCR para extracao de texto de PDFs e imagens
- [ ] Compartilhamento de documentos entre usuarios
- [ ] Planos de assinatura com Stripe
- [ ] App mobile (React Native / Expo)
- [ ] Multi-tenancy para equipes e empresas
- [ ] Integracao com Google Drive e OneDrive
- [ ] Auditoria e historico de acoes
- [ ] Dashboard avancado com metricas temporais
- [ ] Exportacao de relatorios em PDF

---

## Contribuicao

1. Fork o repositorio
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alteracoes (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

<p align="center">
  Feito com dedicacao para resolver um problema real.
  <br />
  <strong>OrganizaDoc</strong> -- seus documentos organizados, seus prazos sob controle.
</p>
