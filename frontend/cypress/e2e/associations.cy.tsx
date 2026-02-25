describe("Associations Page", () => {

    beforeEach(() => {
  
      cy.intercept("GET", "/products", {
        statusCode: 200,
        body: [
          { id: 1, name: "Produto A" },
          { id: 2, name: "Produto B" },
        ],
      }).as("getProducts");
  
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [
          { id: 1, name: "Aço" },
          { id: 2, name: "Plástico" },
        ],
      }).as("getMaterials");
  
      cy.visit("/associations");
  
      cy.wait("@getProducts");
      cy.wait("@getMaterials");
    });
  
    it("deve carregar selects corretamente", () => {
      cy.get("[data-cy=select-product]")
        .find("option")
        .should("have.length", 3); // 2 + default
  
      cy.get("[data-cy=select-material]")
        .find("option")
        .should("have.length", 3);
    });
  
    it("deve criar associação com sucesso", () => {
  
      cy.intercept("POST", "/product-compositions", {
        statusCode: 201,
      }).as("createAssociation");
  
      cy.get("[data-cy=select-product]").select("1");
      cy.get("[data-cy=select-material]").select("2");
      cy.get("[data-cy=input-quantity]").type("5");
  
      cy.get("[data-cy=submit-association]").click();
  
      cy.wait("@createAssociation");
  
      cy.get("[data-cy=success-message]")
        .should("be.visible");
    });
  
    it("deve mostrar erro se falhar", () => {
  
      cy.intercept("POST", "/product-compositions", {
        statusCode: 500,
      }).as("createFail");
  
      cy.get("[data-cy=select-product]").select("1");
      cy.get("[data-cy=select-material]").select("2");
      cy.get("[data-cy=input-quantity]").type("5");
  
      cy.get("[data-cy=submit-association]").click();
  
      cy.wait("@createFail");
  
      cy.get("[data-cy=error-message]")
        .should("be.visible");
    });
  
  });