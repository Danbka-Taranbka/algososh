import { ButtonsTypes } from "../../src/types/buttons";
import {blue, purple } from "../../src/constants/border-colors";
import { circleTestId, headTestId, tailTestId } from "../../src/constants/test-ids";

function checkDigit (index:  number, digit: number, color: string, top?: true) {
  cy.get('li').eq(index).as('element');

  cy.get('@element')
    .find(tailTestId)
    .should('have.text', index);
  
  cy.get('@element')
    .find(circleTestId)
    .should("have.css", "border", color)
    .and("have.text", digit)

  if (top) {
    cy.get('@element')
      .find(headTestId)
      .should('have.text', 'top');
  }
}

describe('Stack', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/stack');
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
    cy.get('li').should('have.length', '1');

    cy.get('@input').type('5');
    cy.get('@addButton').click();
    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@resetButton').should('not.be.disabled');
    cy.get('li').should('have.length', '2');
    cy.get('@input').type('5');
    cy.get('@addButton').click();
    cy.get('li').should('have.length', '3');
    cy.get('@deleteButton').click();
    cy.get('li').should('have.length', '2');
    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@resetButton').should('not.be.disabled');
    cy.get('@resetButton').click();
    cy.get('li').should('have.length', '0');
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
    checkDigit(0, 1, purple, true);
    cy.tick(500);
    checkDigit(0, 1, blue, true);
    cy.get('@input').type('3');
    cy.tick(500);
    cy.get('@addButton').click();
    checkDigit(0, 1, blue);
    checkDigit(1, 3, purple, true);
    cy.tick(500);
    checkDigit(0, 1, blue);
    checkDigit(1, 3, blue, true);
    cy.get('@input').type('7');
    cy.tick(500);
    cy.get('@addButton').click();
    checkDigit(0, 1, blue);
    checkDigit(1, 3, blue);
    checkDigit(2, 7, purple, true);
    cy.tick(500);
    checkDigit(0, 1, blue);
    checkDigit(1, 3, blue);
    checkDigit(2, 7, blue, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, 1, blue);
    checkDigit(1, 3, blue);
    checkDigit(2, 7, purple, true);
    cy.tick(500);
    checkDigit(0, 1, blue);
    checkDigit(1, 3, blue, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, 1, blue);
    checkDigit(1, 3, purple, true);
    cy.tick(500);
    checkDigit(0, 1, blue, true);
    cy.tick(500);
    cy.get('@deleteButton').click();
    checkDigit(0, 1, purple, true);
    cy.tick(500);
    cy.get('li').should('have.length', '0');
  });
}); 