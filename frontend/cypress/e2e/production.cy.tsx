describe("Production Page", () => {

    beforeEach(() => {
      cy.visit("/production");
    });
  
    it("deve exibir estado inicial", () => {
      cy.get("[data-cy=empty-state]")
        .should("be.visible");
    });
  
    it("deve calcular produção corretamente", () => {
  
      cy.intercept("GET", "/production", {
        statusCode: 200,
        body: [
          {
            productId: 1,
            productName: "Produto A",
            quantityProduced: 10,
            totalValue: 1000,
          },
          {
            productId: 2,
            productName: "Produto B",
            quantityProduced: 5,
            totalValue: 500,
          },
        ],
      }).as("calculate");
  
      cy.get("[data-cy=calculate-button]").click();
  
      cy.wait("@calculate");
  
      cy.get("[data-cy=production-card]")
        .should("have.length", 2);
  
      cy.get("[data-cy=global-value]")
        .should("contain", "R$ 1.500,00");
  
      cy.contains("Produto A").should("be.visible");
      cy.contains("Produto B").should("be.visible");
    });
  
    it("deve mostrar loading enquanto calcula", () => {
  
      cy.intercept("GET", "/production", (req) => {
        req.reply((res) => {
          res.delay = 1000;
          res.send([
            {
              productId: 1,
              productName: "Produto A",
              quantityProduced: 10,
              totalValue: 1000,
            },
          ]);
        });
      }).as("calculate");
  
      cy.get("[data-cy=calculate-button]").click();
  
      cy.contains("Calculando...")
        .should("be.visible");
  
      cy.wait("@calculate");
    });
  
  });