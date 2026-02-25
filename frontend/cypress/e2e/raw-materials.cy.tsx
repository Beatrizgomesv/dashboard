describe("Raw Materials Page", () => {

    beforeEach(() => {
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [
          { id: 1, name: "Aço", stockQuantity: 50 },
          { id: 2, name: "Plástico", stockQuantity: 30 },
        ],
      }).as("getMaterials");
  
      cy.visit("/raw-materials");
      cy.wait("@getMaterials");
    });
  
    it("deve listar matérias-primas", () => {
      cy.contains("Aço").should("be.visible");
      cy.contains("Plástico").should("be.visible");
      cy.get("[data-cy=material-card]").should("have.length", 2);
    });
  
    it("deve criar nova matéria-prima com sucesso", () => {
  
      cy.intercept("POST", "/raw-materials", {
        statusCode: 201,
        body: { id: 3, name: "Vidro", stockQuantity: 20 },
      }).as("createMaterial");
  
      cy.intercept("GET", "/raw-materials", {
        statusCode: 200,
        body: [
          { id: 1, name: "Aço", stockQuantity: 50 },
          { id: 2, name: "Plástico", stockQuantity: 30 },
          { id: 3, name: "Vidro", stockQuantity: 20 },
        ],
      }).as("reloadMaterials");
  
      cy.get("[data-cy=material-name]").type("Vidro");
      cy.get("[data-cy=material-stock]").type("20");
  
      cy.get("[data-cy=submit-material]").click();
  
      cy.wait("@createMaterial");
      cy.wait("@reloadMaterials");
  
      cy.get("[data-cy=success-message]")
        .should("be.visible");
  
      cy.contains("Vidro").should("be.visible");
    });
  
    it("deve mostrar erro ao falhar cadastro", () => {
  
      cy.intercept("POST", "/raw-materials", {
        statusCode: 500,
      }).as("createMaterialFail");
  
      cy.get("[data-cy=material-name]").type("Falha");
      cy.get("[data-cy=material-stock]").type("10");
  
      cy.get("[data-cy=submit-material]").click();
  
      cy.wait("@createMaterialFail");
  
      cy.get("[data-cy=error-message]")
        .should("be.visible");
    });
  
  });