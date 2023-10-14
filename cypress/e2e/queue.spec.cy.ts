import { ButtonsTypes } from "../../src/types/buttons";

const blue = "3.63636px solid rgb(0, 50, 255)";
const purple = "3.63636px solid rgb(210, 82, 225)";

function checkDigit (index:  number, digit: number | '', color: string, head?: boolean, tail?: boolean) {
  cy.get('li').eq(index).as('element');

  cy.get('@element')
  .find('[data-testid="circle"]')
  .should("have.css", "border", color);
  
  cy.get('@element')
    .find('[data-testid="circle-text"]')
    .should('have.text', digit);

  cy.get('@element')
    .find('[data-testid="index"]')
    .should('have.text', index);

  if (head) {
    cy.get('@element')
      .find('[data-testid="head"]')
      .should('have.text', 'head');
  }

  if (tail) {
    cy.get('@element')
      .find('[data-testid="tail"]')
      .should('have.text', 'tail');
  }
}

describe('Queue', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/queue');
  });

  it('add button is disabled with an empty input', function() {
    cy.get(`button[name="${ButtonsTypes.Add}"]`).as('addButton');
    cy.get('input').as('input');

    cy.get('@input').should('have.value', '');
    cy.get('@addButton').should('be.disabled');

    cy.get('@input').type('10');
    cy.get('@input').should('have.value', '10');
    cy.get('@addButton').should('not.be.disabled');
    cy.get('@addButton').click();
    cy.get('@addButton').should('be.disabled');


    cy.get('@input').clear();
    cy.get('@addButton').should('be.disabled');
  });

  it('delete and reset buttons activate correctly', function() {
    cy.get(`button[name="${ButtonsTypes.Add}"]`).as('addButton');
    cy.get(`button[name="${ButtonsTypes.Delete}"]`).as('deleteButton');
    cy.get(`button[name="${ButtonsTypes.Reset}"]`).as('resetButton');
    cy.get('input').as('input');


    cy.get('@input').should('have.value', '');
    cy.get('@deleteButton').should('be.disabled');
    cy.get('@resetButton').should('be.disabled');

    cy.get('@input').type('10');
    cy.get('@addButton').click();
    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@resetButton').should('not.be.disabled');


    cy.get('@input').type('5');
    cy.get('@addButton').click();
    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@resetButton').should('not.be.disabled');

    cy.get('@input').type('5');
    cy.get('@addButton').click();

    cy.get('@deleteButton').click();

    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@resetButton').should('not.be.disabled');
    cy.get('@resetButton').click();

    cy.get('@deleteButton').should('be.disabled');
    cy.get('@resetButton').should('be.disabled');
  });

  it('should add and remove elements correctly', function () {
    cy.clock();
    cy.get(`button[name="${ButtonsTypes.Add}"]`).as('addButton');
    cy.get(`button[name="${ButtonsTypes.Delete}"]`).as('deleteButton');
    cy.get('input').as('input');

    cy.get('@input').type('1');
    cy.tick(500);
    cy.get('@addButton').click();
    cy.tick(500);
    checkDigit(0, 1, blue, true, false);
    cy.tick(500);
    cy.get('@input').type('3');
    cy.tick(500);
    cy.get('@addButton').click();
    cy.tick(500);
    checkDigit(0, 1, blue, true, false);
    checkDigit(1, 3, blue, false, true);
    cy.get('@input').type('7');
    cy.tick(500);
    cy.get('@addButton').click();
    cy.tick(500);
    checkDigit(0, 1, blue, true, false);
    checkDigit(1, 3, blue);
    checkDigit(2, 7, blue, false, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, 1, purple, true, false);
    checkDigit(1, 3, blue);
    checkDigit(2, 7, blue, false, true);
    cy.tick(500);
    checkDigit(0, '', blue);
    checkDigit(1, 3, blue, true, false);
    checkDigit(2, 7, blue, false, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, '', blue);
    checkDigit(1, 3, purple, true, false);
    checkDigit(2, 7, blue, false, true);
    cy.tick(500);
    checkDigit(0, '', blue);
    checkDigit(1, '', blue);
    checkDigit(2, 7, blue, true, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, '', blue);
    checkDigit(1, '', blue);
    checkDigit(2, 7, purple, true, true);
    cy.tick(500);
    cy.get('li').should('have.length', '7');
    cy.get('ul>li').each(($el, index) => {checkDigit(index, '', blue)});
  });
}); 