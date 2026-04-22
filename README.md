# TI-Ticket

Este repositório contém uma aplicação robusta de gerenciamento de chamados técnicos, desenvolvida sob os pilares da **Engenharia de Software Moderna**: Testes Rigorosos (TDD), Entrega Contínua (CI/CD) e Monitoramento de Saúde (Observabilidade).

---

## 1. Problema

Em setores de Tecnologia da Informação, é comum que solicitações cheguem por diferentes canais, como WhatsApp, e-mail ou comunicação informal, dificultando o controle e a definição de responsáveis. A situação se agrava quando chamados são encerrados sem registro das ações realizadas. O TI-Ticket organiza esse processo ao garantir que cada chamado tenha um responsável e que, ao ser finalizado, sejam registrados o status e a descrição técnica da solução aplicada.

---

### Requisitos Funcionais (RF)

- **RF01 - Ciclo de Vida do Ticket (CRUD):** Persistência completa de incidentes, incluindo metadados de Título, Descrição, Nível de Severidade e Status.
- **RF02 - Gestão de Operações Técnicas:**
  - **Atribuição (Ownership):** Funcionalidade para que o técnico assuma a responsabilidade pelo ticket, realizando a transição de estado para "Em Atendimento".
  - **Delegamento:** Capacidade de transferência de tickets entre membros da equipe técnica.
  - **Registros de Evolução:** Inserção de notas técnicas incrementais para documentar o progresso da resolução.
- **RF03 - Transação de Encerramento :** Implementação de bloco transacional que garante a execução simultânea de:
  1. **Update**: Alteração do status do ticket para 'Concluído'.
  2. **Insert**: Registro obrigatório do diagnóstico na tabela de `TicketHistory`.
     _Mecanismo de Segurança: Falhas na escrita do histórico disparam Rollback imediato no status do ticket._
- **RF04 - Gestão de Acordo de Nível de Serviço:** Cálculo dinâmico do tempo limite de resolução baseado na matriz de prioridade (Ex: Alta: 4h | Baixa: 24h).
- **RF05 - Protocolo de Reabertura:** Restrição de reabertura de chamados condicionado à inserção de justificativa técnica (mín. 20 caracteres), validada em camada de serviço.
- **RF06 - Dashboard Analítico:** Interface para filtragem multidimensional (prioridade, técnico, período) e busca full-text.

### Requisitos Não Funcionais (RNF)

- **RNF01 - Qualidade de Código (TDD):** Desenvolvimento orientado a testes com foco em testes de integração para validar a consistência do banco de dados.
- **RNF02 - Entrega Contínua (CI/CD):** Pipeline automatizado via **GitHub Actions** para validação de build e execução de testes em cada integração.
- **RNF03 - Observabilidade:** Logging estruturado para monitoramento de exceções e telemetria básica de performance da API.
- **RNF04 - Segurança e Autenticação:** Controle de acesso baseado em **JWT** e implementação de middlewares para sanitização contra SQL Injection.
- **RNF05 - Idempotência de API:** Garantia de que múltiplas requisições para a mesma operação de fechamento não resultem em registros duplicados.

---

## 2. Stack Tecnológica e Arquitetura

| Tecnologia                     | Função   | Justificativa                                                        |
| :----------------------------- | :------- | :------------------------------------------------------------------- |
| **Node.js + Express**          | Backend  | Alta performance para requisições assíncronas e facilidade com JSON. |
| **Next.js + React + Tailwind** | Frontend | Interface moderna, responsiva e de rápida implementação.             |
| **PostgreSQL**                 | Database | Banco relacional                                                     |
| **Jest + Supertest**           | QA       | TDD padrão para garantir a confiabilidade do sistema.                |

## 3. Figma

Link: https://www.figma.com/design/ytKkT3vD3ScdnTQd3tn92s/TI-Ticket?node-id=3-376&t=APlxH9cPtzP2yzQS-1

## 4. Arquitetura em modelo C4

Link: https://drive.google.com/file/d/102q4oNUW_oZW1USY7wMFsnwwLiVhCBxk/view?usp=sharing

## 5. Como Executar o Projeto Localmente

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ti-ticket.git
cd ti-ticket
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias:

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ti_ticket"

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
