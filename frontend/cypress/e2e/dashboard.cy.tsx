describe("Dashboard Page", () => {

  beforeEach(() => {
    cy.mockDashboard();
    cy.visit("/");
  });

  it("deve renderizar os dados corretamente", () => {

    cy.contains("Dashboard").should("be.visible");

    cy.get("[data-cy=products-count]")
      .should("have.text", "2");

    cy.get("[data-cy=materials-count]")
      .should("have.text", "3");

    cy.get("[data-cy=production-value]")
      .should("contain", "R$ 2.000,00"); 
  });

});