/* global describe, it, cy */

describe('Проверка работы cypress', () => {
  it('Получение имени пользователя', () => {
    cy.intercept('GET', '/api/users').as('users');
    cy.visit('/');
    cy.wait(['@users']);
    cy.get('body').contains('Alex');
  });

  it('Клик по кнопке', () => {
    cy.get('#btn').click();
    cy.get('body').contains('e2e is awesome');
  });
});
