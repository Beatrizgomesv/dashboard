describe("Fluxo completo do sistema", () => {

    it("deve criar produto, associar material e refletir na produção e dashboard", () => {
  
      // ---------- MOCK INICIAL ----------
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [],
      }).as("getMaterials");
  
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [],
      }).as("getProducts");
  
      // ---------- 1️⃣ CRIAR MATÉRIA-PRIMA ----------
      cy.visit("/raw-materials");
      cy.wait("@getMaterials");
  
      cy.intercept("POST", "/raw-materials", {
        statusCode: 201,
        body: { id: 1, name: "Aço", stockQuantity: 100 },
      }).as("createMaterial");
  
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [{ id: 1, name: "Aço", stockQuantity: 100 }],
      }).as("reloadMaterials");
  
      cy.get("[data-cy=material-name]").type("Aço");
      cy.get("[data-cy=material-stock]").type("100");
      cy.get("[data-cy=submit-material]").click();
  
      cy.wait("@createMaterial");
      cy.wait("@reloadMaterials");
  
      cy.contains("Aço").should("be.visible");
  
      // ---------- 2️⃣ CRIAR PRODUTO ----------
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [],
      }).as("getProducts2");
  
      cy.visit("/products");
      cy.wait("@getProducts2");
  
      cy.intercept("POST", "/products", {
        statusCode: 201,
        body: { id: 1, name: "Produto A", price: 50 },
      }).as("createProduct");
  
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [{ id: 1, name: "Produto A", price: 50 }],
      }).as("reloadProducts");
  
      cy.get("[data-cy=product-name]").type("Produto A");
      cy.get("[data-cy=product-price]").type("50");
      cy.get("[data-cy=submit-product]").click();
  
      cy.wait("@createProduct");
      cy.wait("@reloadProducts");
  
      cy.contains("Produto A").should("be.visible");
  
      // ---------- 3️⃣ CRIAR ASSOCIAÇÃO ----------
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [{ id: 1, name: "Produto A" }],
      }).as("getAssocProducts");
  
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [{ id: 1, name: "Aço" }],
      }).as("getAssocMaterials");
  
      cy.visit("/associations");
      cy.wait("@getAssocProducts");
      cy.wait("@getAssocMaterials");
  
      cy.intercept("POST", "/product-compositions", {
        statusCode: 201,
      }).as("createAssociation");
  
      cy.get("[data-cy=select-product]").select("1");
      cy.get("[data-cy=select-material]").select("1");
      cy.get("[data-cy=input-quantity]").type("2");
  
      cy.get("[data-cy=submit-association]").click();
  
      cy.wait("@createAssociation");
  
      cy.get("[data-cy=success-message]").should("be.visible");
  
      // ---------- 4️⃣ PRODUÇÃO ----------
      cy.intercept("GET", "/production", {
        statusCode: 200,
        body: [
          {
            productId: 1,
            productName: "Produto A",
            quantityProduced: 50,
            totalValue: 2500,
          },
        ],
      }).as("calculateProduction");
  
      cy.visit("/production");
  
      cy.get("[data-cy=calculate-button]").click();
      cy.wait("@calculateProduction");
  
      cy.get("[data-cy=global-value]")
        .should("contain", "R$ 2.500,00");
  
      // ---------- 5️⃣ DASHBOARD ----------
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [{ id: 1, name: "Produto A" }],
      });
  
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [{ id: 1, name: "Aço" }],
      });
  
      cy.intercept("GET", "/production", {
        statusCode: 200,
        body: [
          {
            productId: 1,
            productName: "Produto A",
            quantityProduced: 50,
            totalValue: 2500,
          },
        ],
      });
  
      cy.visit("/");
  
      cy.get("[data-cy=products-count]")
        .should("have.text", "1");
  
      cy.get("[data-cy=materials-count]")
        .should("have.text", "1");
  
      cy.get("[data-cy=production-value]")
        .should("contain", "R$ 2.500,00");
  
    });
  
  });