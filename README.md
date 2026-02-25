# Sistema de Gestão de Produção e Estoque

## 📌 Visão Geral

Este projeto foi desenvolvido como parte de um teste prático técnico.

O sistema simula um ambiente industrial onde produtos são fabricados a partir de matérias-primas. Ele permite gerenciar produtos, controlar o estoque de insumos, definir associações entre produtos e matérias-primas e calcular quais produtos podem ser produzidos com base no estoque disponível.

A aplicação segue arquitetura fullstack com separação clara entre front-end e back-end, aplicando boas práticas de organização, testes automatizados e regras de negócio.

---

## 🏗️ Arquitetura

O projeto está estruturado em formato **monorepo**:


inventory-system/

├── backend/ → API REST em Spring Boot

└── frontend/ → Aplicação React + Vite


### Backend
- API RESTful
- Camadas organizadas em Controller → Service → Repository
- Regras de negócio centralizadas na camada de serviço

### Frontend
- SPA (Single Page Application)
- Comunicação com a API via Axios
- Interface responsiva

---

## ⚙️ Tecnologias Utilizadas

### 🔹 Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- JUnit 5
- Mockito
- Springdoc OpenAPI (Swagger)

### 🔹 Frontend
- React
- TypeScript
- Vite
- Axios
- TailwindCSS
- Vitest
- Cypress

---

## 📊 Funcionalidades

### Backend

- CRUD completo de Produtos
- CRUD completo de Matérias-Primas
- CRUD de Associações Produto ↔ Matéria-Prima
- Endpoint para simulação de produção
- Regra de negócio para priorização de produtos de maior valor

### Frontend

- Tela de gerenciamento de produtos
- Tela de gerenciamento de matérias-primas
- Tela de associações
- Tela de simulação de produção
- Dashboard com visão geral
- Interface responsiva

---

## 🗄️ Modelo de Dados

### Product
- id
- name
- price

### RawMaterial
- id
- name
- stockQuantity

### ProductComposition
- productId
- rawMaterialId
- quantity

---

## 🧠 Regra de Negócio – Simulação de Produção

O sistema calcula:

- Quais produtos podem ser produzidos
- Quantidade máxima possível com base no estoque disponível
- Valor total potencial de produção

Quando uma matéria-prima é utilizada por mais de um produto, a priorização é feita considerando os produtos de maior valor.

---

## 🧪 Testes Automatizados

### Backend
- Testes unitários com JUnit 5
- Mock de dependências com Mockito
- Validação da lógica de negócio

### Frontend
- Testes unitários com Vitest
- Testes de componentes
- Testes End-to-End com Cypress

Fluxos validados:
- Cadastro de produto
- Cadastro de matéria-prima
- Associação entre produto e matéria-prima
- Simulação de produção
- Validação de cálculos e valores exibidos

---

## 🚀 Como Executar o Projeto Localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Beatrizgomesv/dashboard.git
cd inventory-system
🔧 Configuração do Backend

O projeto utiliza PostgreSQL como banco de dados.

Configure as seguintes variáveis de ambiente:

DB_URL

DB_USERNAME

DB_PASSWORD

Exemplo:

DB_URL=jdbc:postgresql://localhost:5432/inventory_db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
Executar o backend
cd backend
./mvnw spring-boot:run

A API ficará disponível em:

http://localhost:8080

Swagger:

http://localhost:8080/swagger-ui.html
💻 Executar o Frontend
cd frontend
npm install
npm run dev

Frontend disponível em:

http://localhost:5173
🧪 Executar Testes
Backend
cd backend
./mvnw test
Frontend – Testes Unitários
cd frontend
npm run test
Cypress – Testes E2E
cd frontend
npx cypress open
📋 Requisitos Atendidos
Requisitos Não Funcionais

Aplicação WEB

Separação entre front-end e back-end (arquitetura API)

Interface responsiva

Persistência em banco relacional

Backend desenvolvido com framework

Código desenvolvido em inglês

Testes automatizados

Requisitos Funcionais

CRUD de Produtos

CRUD de Matérias-Primas

CRUD de Associações

Consulta de produção possível com base no estoque

Interface gráfica para todas as operações

🧩 Decisões Técnicas

Separação clara de responsabilidades

Uso de boas práticas REST

Centralização das regras de negócio

Configuração via variáveis de ambiente

Estrutura preparada para deploy em ambiente cloud

Organização em monorepo para melhor gerenciamento

💡 Possíveis Melhorias Futuras

Autenticação e autorização

Paginação e filtros

Containerização com Docker

Pipeline CI/CD completo

Ambiente de produção com banco em nuvem

Otimização avançada da lógica de produção

👩‍💻 Desenvolvido por

Beatriz Gomes

📎 Observações Finais

O projeto foi desenvolvido com foco em:

Organização

Clareza de código

Boas práticas

Testabilidade

Implementação real de regras de negócio

O sistema está funcional e pronto para avaliação técnica.
