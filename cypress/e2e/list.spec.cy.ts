import { ButtonsTypes } from '../../src/types/buttons';
import {blue, purple, green} from '../../src/constants/border-colors';
import { circleTestId, headTestId, indexTestId, tailTestId } from '../../src/constants/test-ids';

function checkDigit (index:  number, digit: number | '', color: string, head?: boolean, tail?: boolean) {
  cy.get('li').eq(index).as('element');

  cy.get('@element')
  .find(circleTestId)
  .should('have.css', 'border', blue)
  .and('have.text', digit);

  cy.get('@element')
    .find(indexTestId)
    .should('have.text', index);

  if (head) {
    cy.get('@element')
      .find(headTestId)
      .should('have.text', 'head');
  }

  if (tail) {
    cy.get('@element')
      .find(tailTestId)
      .should('have.text', 'tail');
  }
}

describe('List', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/list');
  });

  it('default list is rendered correctly', function() {
    cy.get('li').should('have.length', 4);

    cy.get('ul').within(() => {
      checkDigit(0, 3, blue, true);
      checkDigit(1, 4, blue);
      checkDigit(2, 5, blue);
      checkDigit(3, 6, blue, false, true);
    })
  });

  it('buttons activate correctly', function() {
    cy.get(`button[name='${ButtonsTypes.Prepend}']`).as('prependButton');
    cy.get(`button[name='${ButtonsTypes.Append}']`).as('appendButton');
    cy.get(`button[name='${ButtonsTypes.AddByIndex}']`).as('addByIndexButton');
    cy.get(`button[name='${ButtonsTypes.DeleteByIndex}']`).as('deleteByIndexButton');
    cy.get('input[name="inputValue"]').as('inputValue');
    cy.get('input[name="inputIndex"]').as('inputIndex');

    cy.get('@inputValue').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@inputValue').type('10');
    cy.get('@inputValue').should('have.value', '10');
    cy.get('@prependButton').should('not.be.disabled');
    cy.get('@appendButton').should('not.be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@prependButton').click();

    cy.get('@inputValue').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@inputValue').type('9');
    cy.get('@inputValue').should('have.value', '9');
    cy.get('@prependButton').should('not.be.disabled');
    cy.get('@appendButton').should('not.be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@appendButton').click();

    cy.get('@inputValue').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@inputIndex').type('2');
    cy.get('@inputIndex').should('have.value', '2');
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('not.be.disabled');

    cy.get('@deleteByIndexButton').click();

    cy.get('@inputValue').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');

    cy.get('@inputIndex').type('3');
    cy.get('@inputIndex').should('have.value', '3');
    cy.get('@inputValue').type('8');
    cy.get('@inputValue').should('have.value', '8');
    cy.get('@prependButton').should('not.be.disabled');
    cy.get('@appendButton').should('not.be.disabled');
    cy.get('@addByIndexButton').should('not.be.disabled');
    cy.get('@deleteByIndexButton').should('not.be.disabled');

    cy.get('@inputIndex').clear();
    cy.get('@inputValue').clear();
    cy.get('@prependButton').should('be.disabled');
    cy.get('@appendButton').should('be.disabled');
    cy.get('@addByIndexButton').should('be.disabled');
    cy.get('@deleteByIndexButton').should('be.disabled');
  });

  it('should prepend elements correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.Prepend}']`).as('prependButton');
    cy.get('input[name="inputValue"]').as('inputValue');

    cy.get('@inputValue').type('1');
    cy.get('@inputValue').should('have.value', '1');
    cy.get('@prependButton').should('not.be.disabled')
      .click();

    cy.get('li')
      .first()
      .within(() => {
        cy.get(headTestId)
          .first()
          .find(circleTestId)
          .should('have.text', '1')
          .and('have.css', 'border', purple);
      });
    
    cy.tick(500);

    cy.get('li')
    .should('have.length', '5')
    .first()
    .within(() => {
      cy.get(headTestId).should('have.text', 'head');
      cy.get(circleTestId).should('have.css', 'border', green);
    });

    cy.tick(500);

    cy.get('li')
    .first()
    .find(circleTestId)
    .should('have.css', 'border', blue);
  });

  it('should apppend elements correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.Append}']`).as('appendButton');
    cy.get('input[name="inputValue"]').as('inputValue');

    cy.get('@inputValue').type('1');
    cy.get('@inputValue').should('have.value', '1');
    cy.get('@appendButton').should('not.be.disabled')
      .click();

    cy.get('li')
      .last()
      .within(() => {
        cy.get(headTestId)
          .first()
          .find(circleTestId)
          .should('have.text', '1')
          .and('have.css', 'border', purple);
      });
    
    cy.tick(500);

    cy.get('li')
    .should('have.length', '5')
    .last()
    .within(() => {
      cy.get(tailTestId).should('have.text', 'tail');
      cy.get(circleTestId).should(
        'have.css',
        'border',
        green
      );
    });

    cy.tick(500);

    cy.get('li')
    .last()
    .find(circleTestId)
    .should('have.css', 'border', blue);
  });

  it('should delete elements from head correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.DeleteHead}']`).as('deleteHeadButton');

    cy.get('@deleteHeadButton').click();

    cy.get('li')
    .should('have.length', '4')
      .first()
      .within(() => {
        cy.get(headTestId).should('have.text', 'head');
        cy.get(circleTestId).first().should('have.text', '');
        cy.get(tailTestId)
          .first()
          .find(circleTestId)
          .should('have.text', '3')
          .and('have.css', 'border', purple);
      });
    
    cy.tick(500);

    cy.get('li')
    .should('have.length', '3')
    .first()
    .within(() => {
      cy.get(headTestId).should('have.text', 'head');
      cy.get(circleTestId).should(
        'have.css',
        'border',
        blue
      )
      .and('have.text', '4')
    });
  });

  it('should delete elements from tail correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.DeleteTail}']`).as('deleteTailButton');

    cy.get('@deleteTailButton').click();

    cy.get('li')
    .should('have.length', '4')
      .last()
      .within(() => {
        cy.get(circleTestId).first().should('have.text', '');
        cy.get(tailTestId)
          .first()
          .find(circleTestId)
          .should('have.text', '6')
          .and('have.css', 'border', purple);
      });
    
    cy.tick(500);

    cy.get('li')
    .should('have.length', '3')
    .last()
    .within(() => {
      cy.get(tailTestId).should('have.text', 'tail');
      cy.get(circleTestId).should(
        'have.css',
        'border',
        blue
      )
      .and('have.text', '5')
    });
  });

  it('should add elements by index correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.AddByIndex}']`).as('addByIndexButton');
    cy.get('input[name="inputValue"]').as('inputValue');
    cy.get('input[name="inputIndex"]').as('inputIndex');

    cy.get('@inputValue').type('10');
    cy.get('@inputValue').should('have.value', '10');

    cy.get('@inputIndex').type('2');
    cy.get('@inputIndex').should('have.value', '2');

    cy.get('@addByIndexButton').click();

    cy.get('li')
    .should('have.length', '4')
      .first()
      .within(() => {
        cy.get(circleTestId).last().should('have.text', '3')
          .and('have.css', 'border', blue);
        cy.get(headTestId)
          .first()
          .find(circleTestId)
          .should('have.text', '10')
          .and('have.css', 'border', purple);
      });
    
    cy.tick(500);

    cy.get('li')
      .should('have.length', 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', purple);
          });
        }
        if (index === 1) {
          cy.wrap($li)
            .find(headTestId)
            .find(circleTestId)
            .should('have.text', '10')
            .and('have.css', 'border', purple);
        }
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', purple);
          });
        }
        if (index === 1) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '4')
            .and('have.css', 'border', purple);
          }

        if (index === 2) {
          cy.wrap($li)
            .find(headTestId)
            .find(circleTestId)
            .should('have.text', '10')
            .and('have.css', 'border', purple);
          }
        });

    cy.tick(500);

    cy.get('li')
      .should('have.length', 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', blue);
          });
        }

        if (index === 1) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '4')
            .and('have.css', 'border', blue);
          }
  
        if (index === 2) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '10')
            .and('have.css', 'border', green);
          }

        if (index === 3) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '5')
            .and('have.css', 'border', blue);
          }
        });

    cy.tick(500);

    cy.get('li')
      .should('have.length', 5)
      .each(($li) => {
        cy.wrap($li)
          .find(circleTestId)
          .should('have.css', 'border', blue);
      });
  });

  it('should remove elements by index correctly', function () {
    cy.clock();
    cy.get(`button[name='${ButtonsTypes.DeleteByIndex}']`).as('deleteByIndexButton');
    cy.get('input[name="inputValue"]').as('inputValue');
    cy.get('input[name="inputIndex"]').as('inputIndex');

    cy.get('@inputIndex').type('2');
    cy.get('@inputIndex').should('have.value', '2');

    cy.get('@deleteByIndexButton').click();

    cy.get('li')
    .should('have.length', '4')
      .first()
      .within(() => {
        cy.get(circleTestId).last().should('have.text', '3')
          .and('have.css', 'border', purple);
        cy.get(headTestId)
          .should('have.text', 'head')
      });
    
    cy.tick(500);

    cy.get('li')
      .should('have.length', 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', purple);
          });
        }
        if (index === 1) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '4')
            .and('have.css', 'border', purple);
        }
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', purple);
          });
        }
        if (index === 1) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '4')
            .and('have.css', 'border', purple);
        }

        if (index === 2) {
          cy.wrap($li)
            .find(tailTestId)
            .find(circleTestId)
            .should('have.text', '5')
            .and('have.css', 'border', purple);
          }
        });

    cy.tick(500);

    cy.get('li')
      .should('have.length', 3)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should('have.text', 'head');
            cy.get(circleTestId).should('have.css', 'border', blue)
            .and('have.text', '3')
          });
        }

        if (index === 1) {
          cy.wrap($li)
            .find(circleTestId)
            .should('have.text', '4')
            .and('have.css', 'border', blue);
          }
  
        if (index === 2) {
          cy.wrap($li)
          .find(circleTestId)
          .should('have.text', '6')
          .and('have.css', 'border', blue);
          cy.get(tailTestId).last().should('have.text', 'tail');
          }
        });

    cy.tick(500);
  });
}); 