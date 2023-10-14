import { ButtonsTypes } from "../../src/types/buttons";


function checkDigit (index:  number, digit: number) {
  cy.get('li').eq(index).as('element');
  
  cy.get('@element')
    .find('[data-testid="circle-text"]')
    .should('have.text', digit);

  cy.get('@element')
    .find('[data-testid="tail"]')
    .should('have.text', index);
  
  cy.get('@element')
    .find('[data-testid="circle"]')
    .should("have.css", "border", "3.63636px solid rgb(0, 50, 255)");
}

describe('Fibonacci', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('button is disabled with an empty input', function() {
    cy.get(`button[name="${ButtonsTypes.Count}"]`).as('countButton');
    cy.get('input').as('input');

    cy.get('@input').should('have.value', '');
    cy.get('@countButton').should('be.disabled');

    cy.get('@input').type('10');
    cy.get('@input').should('have.value', '10');
    cy.get('@countButton').should('not.be.disabled');

    cy.get('@input').clear();
    cy.get('@countButton').should('be.disabled');
  });

  it('should count the sequence correctly', function () {
    cy.clock();
    cy.get(`button[name="${ButtonsTypes.Count}"]`).as('countButton');
    cy.get('input').as('input');

    cy.get('@input').type('5');
    
    cy.get('@countButton').click();
    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
    });

    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
      checkDigit(1, 1);
    });

    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
      checkDigit(1, 1);
      checkDigit(2, 2);
    });

    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
      checkDigit(1, 1);
      checkDigit(2, 2);
      checkDigit(3, 3);
    });

    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
      checkDigit(1, 1);
      checkDigit(2, 2);
      checkDigit(3, 3);
      checkDigit(4, 5);
    });

    cy.tick(500);

    cy.get('ul').within(() => {
      checkDigit(0, 1);
      checkDigit(1, 1);
      checkDigit(2, 2);
      checkDigit(3, 3);
      checkDigit(4, 5);
      checkDigit(5, 8);
    });
  });
}); 