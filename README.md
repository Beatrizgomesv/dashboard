# 🏭 Sistema de Gestão de Produção e Estoque

📌 **Projeto desenvolvido como parte de um teste prático técnico.**

Este sistema simula um ambiente industrial onde produtos são fabricados a partir de matérias-primas. Ele permite gerenciar estoque, definir composições e simular cenários de produção com base na disponibilidade de insumos.

A aplicação foi desenvolvida seguindo arquitetura **fullstack**, com separação clara entre **frontend** e **backend**.

---

## 📦 Funcionalidades Principais

O sistema permite:

- ✅ Gerenciar produtos  
- ✅ Controlar estoque de matérias-primas  
- ✅ Definir associações entre produtos e insumos  
- ✅ Simular produção com base no estoque disponível  
- ✅ Priorizar produtos de maior valor na sugestão de produção  

---

# 🏗️ Arquitetura

Estrutura organizada em **monorepo**:


inventory-system/


├── backend/ → API REST (Spring Boot)

└── frontend/ → Aplicação React + Vite


## 🔹 Backend

- API RESTful  
- Arquitetura em camadas:  
  `Controller → Service → Repository`  
- Regras de negócio centralizadas na camada de **Service**  
- Persistência em banco relacional (PostgreSQL)

## 🔹 Frontend

- SPA (Single Page Application)  
- Comunicação com a API via **Axios**  
- Interface responsiva com **TailwindCSS**

---

# ⚙️ Tecnologias Utilizadas

## 🖥️ Backend

- Java 17  
- Spring Boot 3  
- Spring Data JPA  
- Hibernate  
- PostgreSQL  
- Maven  
- JUnit 5  
- Mockito  
- Springdoc OpenAPI (Swagger)

## 🌐 Frontend

- React  
- TypeScript  
- Vite  
- Axios  
- TailwindCSS  
- Vitest  
- Cypress  

---

# 📊 Funcionalidades Detalhadas

## Backend

- 🔹 CRUD de Produtos  
- 🔹 CRUD de Matérias-Primas  
- 🔹 CRUD de Associações Produto ↔ Matéria-Prima  
- 🔹 Simulação de produção baseada no estoque  
- 🔹 Priorização por maior valor de produto  

## Frontend

- 🖥️ Tela de Produtos  
- 🧱 Tela de Matérias-Primas  
- 🔗 Tela de Associações  
- 📈 Tela de Simulação de Produção  
- 📊 Dashboard com visão geral  

---

# 🗄️ Modelo de Dados

## 📌 Product
- `id`
- `name`
- `price`

## 📌 RawMaterial
- `id`
- `name`
- `stockQuantity`

## 📌 ProductComposition
- `productId`
- `rawMaterialId`
- `quantity`

---

# 🧠 Regra de Negócio – Simulação de Produção

O sistema calcula:

- ✔️ Quais produtos podem ser produzidos  
- ✔️ Quantidade máxima possível com base no estoque disponível  
- ✔️ Valor total potencial de produção  

Quando uma matéria-prima é compartilhada entre múltiplos produtos, o sistema prioriza automaticamente os **produtos de maior valor**, maximizando o retorno potencial.

---

# 🧪 Testes Automatizados

## Backend

- Testes unitários com **JUnit 5**  
- Mock de dependências com **Mockito**  
- Validação das regras de negócio  

## Frontend

- Testes unitários com **Vitest**  
- Testes de componentes  
- Testes End-to-End com **Cypress**

---

# 🚀 Como Executar o Projeto Localmente

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Beatrizgomesv/dashboard.git
cd inventory-system
🔧 Configuração do Backend
Criar banco PostgreSQL:
inventory_db
Definir variáveis de ambiente:
DB_URL=jdbc:postgresql://localhost:5432/inventory_db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
Executar o backend:
cd backend
./mvnw spring-boot:run

API disponível em:

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

```

## 📋 Requisitos Atendidos
✅ Requisitos Não Funcionais

Aplicação WEB

Separação entre frontend e backend

Interface responsiva

Persistência em banco relacional

Backend desenvolvido com framework moderno

Código em inglês

Testes automatizados

✅ Requisitos Funcionais

CRUD de Produtos

CRUD de Matérias-Primas

CRUD de Associações

Consulta de produção possível

Interface gráfica para todas as operações

## 🧩 Decisões Técnicas

Separação clara de responsabilidades

Centralização das regras de negócio

Boas práticas REST

Configuração via variáveis de ambiente

Estrutura preparada para ambiente cloud

## 💡 Possíveis Melhorias Futuras

🔐 Autenticação e autorização

📄 Paginação e filtros

🐳 Containerização com Docker

🔄 CI/CD completo

☁️ Banco de dados em ambiente cloud

⚡ Otimização avançada da lógica de produção

## 👩‍💻 Desenvolvido por

Beatriz Gomes

## 📎 Observações Finais

Projeto desenvolvido com foco em:

Organização

Clareza

Boas práticas

Testabilidade

✔️ Sistema funcional e pronto para avaliação técnica.
