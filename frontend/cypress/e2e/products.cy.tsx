describe("Products Page", () => {

    beforeEach(() => {
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [
          { id: 1, name: "Produto A", price: 100 },
          { id: 2, name: "Produto B", price: 200 },
        ],
      }).as("getProducts");
  
      cy.visit("/products");
      cy.wait("@getProducts");
    });
  
    it("deve listar produtos", () => {
      cy.contains("Produto A").should("be.visible");
      cy.contains("Produto B").should("be.visible");
  
      cy.get("[data-cy=product-card]").should("have.length", 2);
    });
  
    it("deve criar um novo produto", () => {
  
      cy.intercept("POST", "/products", {
        statusCode: 201,
        body: { id: 3, name: "Produto C", price: 300 },
      }).as("createProduct");
  
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [
          { id: 1, name: "Produto A", price: 100 },
          { id: 2, name: "Produto B", price: 200 },
          { id: 3, name: "Produto C", price: 300 },
        ],
      }).as("reloadProducts");
  
      cy.get("[data-cy=product-name]").type("Produto C");
      cy.get("[data-cy=product-price]").type("300");
      cy.get("[data-cy=submit-product]").click();
  
      cy.wait("@createProduct");
      cy.wait("@reloadProducts");
  
      cy.get("[data-cy=success-message]")
        .should("be.visible");
  
      cy.contains("Produto C").should("be.visible");
    });
  
  });