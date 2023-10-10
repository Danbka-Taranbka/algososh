describe('app works correctly with routes', function() {

  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open main page by default', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open recursion page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="recursion-link"]').click();
    cy.get('[data-testid="recursion-page"]');
    cy.contains('Строка');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });

  it('should open fibonacci page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="fibonacci-link"]').click();
    cy.get('[data-testid="fibonacci-page"]');
    cy.contains('Последовательность Фибоначчи');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });

  it('should open sorting page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="sorting-link"]').click();
    cy.get('[data-testid="sorting-page"]');
    cy.contains('Сортировка массива');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });

  it('should open stack page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="stack-link"]').click();
    cy.get('[data-testid="stack-page"]');
    cy.contains('Стек');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });

  it('should open queue page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="queue-link"]').click();
    cy.get('[data-testid="queue-page"]');
    cy.contains('Очередь');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });

  it('should open list page correctly', function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="list-link"]').click();
    cy.get('[data-testid="list-page"]');
    cy.contains('Связный список');
    cy.get('[data-testid="return-to-main-page-link"]').click();
    cy.get('[data-testid="main-page"]')
  });
}); 