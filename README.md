# 🚀 LinkSafe: Gerenciador de Links Acadêmicos

Repositório destinado à disciplina, com foco em **Desenvolvimento Orientado a Testes (TDD)**, **Integração Contínua (CI/CD)** e **Observabilidade**.

---

## 1. Domínio do Problema
O **LinkSafe** é uma aplicação enxuta para centralizar referências de estudo. O objetivo é resolver a dispersão de materiais (artigos, vídeos, repositórios) durante o semestre letivo, permitindo salvar URLs, categorizá-las e marcar o progresso de leitura.

### Requisitos Funcionais (RF)
* **RF01 - Cadastro de Links:** O sistema deve permitir salvar uma URL acompanhada de um título e uma categoria (ex: "Prova", "Trabalho").
* **RF02 - Listagem e Filtro:** O usuário deve visualizar seus links e poder filtrar por categoria para facilitar a busca.
* **RF03 - Controle de Status:** O usuário deve poder alternar o status do link entre "Pendente" e "Lido".
* **RF04 - Exclusão:** Permitir a remoção de links que não são mais necessários.

### Requisitos Não Funcionais (RNF)
* **RNF01 - TDD (Test Driven Development):** Todas as regras de negócio (validação de URL e troca de status) devem possuir testes unitários e de integração.
* **RNF02 - CI/CD:** O projeto deve possuir um pipeline automatizado que executa os testes a cada *push* e realiza o deploy automaticamente.
* **RNF03 - Observabilidade:** Implementação de logs e métricas básicas para monitorar a criação de novos links e possíveis erros de validação.

---

## 2. Tecnologias e Justificativas

| Tecnologia | Justificativa |
| :--- | :--- |
| **Node.js + Express** | Ambiente leve e rápido para construção de APIs REST. |
| **React.js** | Interface dinâmica e componentizada para uma melhor experiência do usuário. |
| **SQLi** | Banco de dados relacional que dispensa servidores externos, facilitando o deploy e testes. |
| **Jest & Supertest** | Frameworks de testes robustos para garantir a cobertura de código exigida. |
| **GitHub Actions** | Automação total do ciclo de vida da aplicação (Build, Test, Deploy). |

---

## 3. Organização de Tarefas (Plano para Dupla)

| Tarefa | Responsável | Status |
| :--- | :--- | :--- |
| **Setup Inicial:** Configuração do repo, Boilerplate Express e Jest. | **Membro A** | ⏳ |
| **Backend TDD:** Implementação das rotas de CRUD e testes unitários. | **Membro B** | ⏳ |
| **Pipeline CI/CD:** Configuração do workflow automatizado. | **Membro A** | ⏳ |
| **Frontend:** Criação da interface para listar e cadastrar links. | **Membro B** | ⏳ |
| **Observabilidade:** Configuração de logs e monitoramento de erros. | **Membro A** | ⏳ |
| **Documentação:** Relatório final e evidências de testes. | **Dupla** | ⏳ |
