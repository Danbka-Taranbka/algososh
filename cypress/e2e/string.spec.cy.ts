import { ButtonsTypes } from "../../src/types/buttons";

const blue = "3.63636px solid rgb(0, 50, 255)";
const purple = "3.63636px solid rgb(210, 82, 225)";
const green = "3.63636px solid rgb(127, 224, 81)";

function checkLetter (index:  number, letter: string, circleColor: string) {
  cy.get('li')
  .eq(index)
  .should('have.text', letter)
  .find('[data-testid="circle"]')
  .should("have.css", "border", circleColor);
}

describe('Recursion algorithm', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('button is disabled with an empty input', function() {
    cy.get(`button[name="${ButtonsTypes.Reverse}"]`).as('reverseButton');
    cy.get('input').as('input');

    cy.get('@input').should('have.value', '');
    cy.get('@reverseButton').should('be.disabled');

    cy.get('@input').type('Hello');
    cy.get('@input').should('have.value', 'Hello');
    cy.get('@reverseButton').should('not.be.disabled');

    cy.get('@input').clear();
    cy.get('@reverseButton').should('be.disabled');
  });

  it('should reverse the not-odd string correctly', function () {
    cy.clock();
    cy.get(`button[name="${ButtonsTypes.Reverse}"]`).as('reverseButton');
    cy.get('input').as('input');

    cy.get('@input').type('hello');

    cy.get('li').should('have.length', '5');
    cy.get('ul').within(() => {
      checkLetter(0, "h", blue);
      checkLetter(1, "e", blue);
      checkLetter(2, "l", blue);
      checkLetter(3, "l", blue);
      checkLetter(4, "o", blue);
    });
    
    cy.get('@reverseButton').click();
    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "h", purple);
      checkLetter(1, "e", blue);
      checkLetter(2, "l", blue);
      checkLetter(3, "l", blue);
      checkLetter(4, "o", purple);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "e", blue);
      checkLetter(2, "l", blue);
      checkLetter(3, "l", blue);
      checkLetter(4, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "e", purple);
      checkLetter(2, "l", blue);
      checkLetter(3, "l", purple);
      checkLetter(4, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "l", green);
      checkLetter(2, "l", blue);
      checkLetter(3, "e", green);
      checkLetter(4, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "l", green);
      checkLetter(2, "l", purple);
      checkLetter(3, "e", green);
      checkLetter(4, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "l", green);
      checkLetter(2, "l", green);
      checkLetter(3, "e", green);
      checkLetter(4, "h", green);
    });
  });

  it('should reverse the odd string correctly', function () {
    cy.clock();
    cy.get(`button[name="${ButtonsTypes.Reverse}"]`).as('reverseButton');
    cy.get('input').as('input');

    cy.get('@input').type('hero');

    cy.get('li').should('have.length', '4');
    cy.get('ul').within(() => {
      checkLetter(0, "h", blue);
      checkLetter(1, "e", blue);
      checkLetter(2, "r", blue);
      checkLetter(3, "o", blue);
    });
    
    cy.get('@reverseButton').click();
    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "h", purple);
      checkLetter(1, "e", blue);
      checkLetter(2, "r", blue);
      checkLetter(3, "o", purple);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "e", blue);
      checkLetter(2, "r", blue);
      checkLetter(3, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "e", purple);
      checkLetter(2, "r", purple);
      checkLetter(3, "h", green);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "o", green);
      checkLetter(1, "r", green);
      checkLetter(2, "e", green);
      checkLetter(3, "h", green);
    });
  });

  it('should reverse one-letter string correctly', function () {
    cy.clock();
    cy.get(`button[name="${ButtonsTypes.Reverse}"]`).as('reverseButton');
    cy.get('input').as('input');

    cy.get('@input').type('q');

    cy.get('li').should('have.length', '1');
    cy.get('ul').within(() => {
      checkLetter(0, "q", blue);
    });
    
    cy.get('@reverseButton').click();
    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "q", purple);
    });

    cy.tick(1000);

    cy.get('ul').within(() => {
      checkLetter(0, "q", green);
    });
  });
}); 