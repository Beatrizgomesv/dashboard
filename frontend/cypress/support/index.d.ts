/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        mockDashboard(): Chainable<void>;
      }
    }
  }
  
  export {};