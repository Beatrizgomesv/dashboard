/// <reference types="cypress" />

Cypress.Commands.add("mockDashboard", () => {
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
        { id: 1, name: "Material A" },
        { id: 2, name: "Material B" },
        { id: 3, name: "Material C" },
      ],
    }).as("getMaterials");
  
    cy.intercept("GET", "/production", {
      statusCode: 200,
      body: [
        {
          productId: 1,
          productName: "Produto A",
          quantityProduced: 10,
          totalValue: 2000,
        },
      ],
    }).as("getProduction");
  });