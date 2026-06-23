# TI-Ticket

Este repositório contém uma aplicação robusta de gerenciamento de chamados técnicos, desenvolvida sob os pilares da **Engenharia de Software Moderna**: Testes Rigorosos (TDD), Entrega Contínua (CI/CD) e Monitoramento de Saúde (Observabilidade).

---

## 1. Problema

Em setores de Tecnologia da Informação, é comum que solicitações cheguem por diferentes canais, como WhatsApp, e-mail ou comunicação informal, dificultando o controle e a definição de responsáveis. A situação se agrava quando chamados são encerrados sem registro das ações realizadas. O TI-Ticket organiza esse processo ao garantir que cada chamado tenha um responsável e que, ao ser finalizado, sejam registrados o status e a descrição técnica da solução aplicada.

---

### Requisitos Funcionais (RF)

- **RF01 - Ciclo de Vida do Ticket (CRUD):** Persistência de incidentes, incluindo metadados de Título, Descrição e Status (Aberto, Em Atendimento, Concluído).
- **RF02 - Atribuição e Gestão (Ownership):** Associação de um chamado a um técnico e a um cliente responsável.
- **RF03 - Catálogo de Serviços:** Gerenciamento de serviços oferecidos com precificação e status de ativação.
- **RF04 - Orçamentação/Custos de Chamados:** Associação de múltiplos serviços a um ticket, mantendo o histórico de preço (snapshot) praticado no momento da inserção.
- **RF05 - Gestão de Disponibilidade Técnica:** Controle de escalas e horários de trabalho dos técnicos para atendimentos.
- **RF06 - Gestão de Acesso Baseado em Papéis (RBAC):** Definição estrita de rotas e funcionalidades com base nos papéis de Usuário: Administrador (`admin`), Técnico (`technical`) ou Cliente (`client`).

### Requisitos Não Funcionais (RNF)

- **RNF01 - Entrega Contínua (CI/CD):** Pipeline automatizado via **GitHub Actions** para validação de build e execução de testes (schemas/utils) em cada integração.
- **RNF02 - Segurança e Autenticação:** Controle de acesso robusto com **NextAuth**, suportando gestão segura de senhas, sessões e tokens via JWT/Banco.
- **RNF03 - Consistência e Validação de Dados:** Utilização rigorosa da biblioteca `Zod` para checagem e validação de schemas de entrada (nos componentes de UI e em Endpoints/Server Actions).
- **RNF04 - UI Acessível e Responsiva:** Interface desenvolvida sobre **Tailwind CSS** e os primitivos de acessibilidade do **Radix UI**, com suporte unificado a temas (Light/Dark Mode via `next-themes`).
- **RNF05 - Experiência do Usuário (UX):** Resposta imediata ao usuário usando toasts (`sonner`), controle inteligente de formulários (`react-hook-form`) e estados de carregamento otimizados.

---

## 2. Stack Tecnológica e Arquitetura

| Tecnologia                     | Função   | Justificativa                                                        |
| :----------------------------- | :------- | :------------------------------------------------------------------- |
| **Next.js (API Routes/Server Actions)** | Backend  | Alta performance, server-side rendering e integração unificada com o frontend. |
| **Next.js + React + Tailwind** | Frontend | Interface moderna, responsiva e de rápida implementação.             |
| **PostgreSQL + Prisma ORM**    | Database | Banco relacional robusto com ORM tipado para segurança no acesso aos dados. |
| **Jest + React Testing Library**| QA       | TDD padrão para garantir a confiabilidade dos componentes e lógicas. |

## 3. Figma

Link: https://www.figma.com/design/ytKkT3vD3ScdnTQd3tn92s/TI-Ticket?node-id=3-376&t=APlxH9cPtzP2yzQS-1

## 4. Arquitetura em modelo C4

Link: https://drive.google.com/file/d/102q4oNUW_oZW1USY7wMFsnwwLiVhCBxk/view?usp=sharing

## 5. Como Executar o Projeto Localmente

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/matheusfefagundes/TI-Ticket.git
cd TI-Ticket
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias:

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ti-ticket"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-gerada-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Email (Nodemailer)
SMTP_HOST="seu-servidor-smtp"
SMTP_PORT="587"
SMTP_USER="seu-email@example.com"
SMTP_PASS="sua-senha"
SMTP_FROM="noreply@example.com"
```

> **Dica**: Para gerar uma `NEXTAUTH_SECRET` segura, execute:
>
> ```bash
> openssl rand -base64 32
> ```

### Passo 4: Configurar o Banco de Dados

#### Usando Docker Compose

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL automaticamente. O banco será criado conforme definido no `docker-compose.yml`.

### Passo 5: Executar Migrações e Seed do Prisma

```bash
# Executar migrações do banco de dados
npx prisma migrate dev

# (Opcional) Popular o banco com dados iniciais
npx prisma db seed
```

### Passo 6: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O servidor iniciará em: **http://localhost:3000**

### Passo 7: Acessar a Aplicação

1. Abra seu navegador e acesse: `http://localhost:3000`
2. Realize o login com as credenciais criadas durante o seed
3. Comece a usar a aplicação!
