# 🚀 LinkSafe: Gerenciador de Links Acadêmicos

Repositório destinado à disciplina de Programação Web, com foco em **TDD**, **CI/CD**, **Observabilidade** e **Integridade de Dados**.

---

## 1. Domínio do Problema
O **LinkSafe** é uma aplicação enxuta para centralizar referências de estudo. O objetivo é resolver a dispersão de materiais (artigos, vídeos, repositórios) durante o semestre letivo, permitindo salvar URLs, categorizá-las e marcar o progresso de leitura

### Requisitos Funcionais (RF)
* **RF01 - CRUD de Links com Validação:** Criar, ler, atualizar e excluir links. 
    * *Regra:* O backend deve validar se a URL é acessível (Status 200) antes de salvar.
* **RF02 - Sistema de Tags (N:N):** Um link pode ter múltiplas tags (ex: "IA", "Projeto") e uma tag pode estar em vários links.
* **RF03 - Transação de Status e Auditoria:** Ao marcar um link como "Lido", o sistema realiza uma **transação** para:
    1. Atualizar o status na tabela `links`.
    2. Inserir um registro automático na tabela `activity_logs`.
    *Caso uma das operações falhe, o sistema realiza rollback.*
* **RF04 - Exportação de Dados:** Botão para gerar relatório de links em formato JSON/CSV.

### Requisitos Não Funcionais (RNF)
* **RNF01 - TDD (Test Driven Development):** Cobertura de testes unitários para a validação de URLs e testes de integração para a transação.
* **RNF02 - CI/CD:** Pipeline via **GitHub Actions** que executa o `lint`, `test` e realiza o deploy automático.
* **RNF03 - Observabilidade:** Monitoramento de falhas em requisições externas e logs de atividades criticas.

---

## 2. Tecnologias e Justificativas

| Tecnologia | Justificativa |
| :--- | :--- |
| **Node.js + Express** | Ambiente leve e rápido para construção de APIs REST. |
| **React.js** | Interface dinâmica para uma experiência fluida. |
| **PostgreSQL / SQLite** | Banco relacional que dispensa servidores externos, ideal para testes e deploy ágil. |
| **Jest & Supertest** | Frameworks padrão para garantir a cobertura de código via TDD. |
| **GitHub Actions** | Automação total do ciclo de vida da aplicação (Build, Test, Deploy). |
| **Prisma ORM** | Facilita a gestão de transações complexas e o relacionamento entre Tags e Links. |
| **Axios** | Utilizado no backend para a validação de disponibilidade das URLs. |

---

## 4. Organização de Tarefas (Plano para Dupla)

| Tarefa | Responsável |
| :--- | :--- |
| **Setup & DB:** Configuração do repo e schema SQLite (Links, Tags, Logs). | **Membro A** |
| **Service de Validação:** Lógica de "ping" na URL externa (TDD). | **Membro B** |
| **API Core:** Rotas de CRUD e Relacionamento N:N. | **Membro B** |
| **Lógica de Transação:** Implementação da transação ACID (Status + Log). | **Membro A** |
| **Pipeline CI/CD:** Configuração do GitHub Actions e Deploy. | **Membro A** |
| **Frontend & Export:** Interface React e exportação de dados. | **Membro B** |
