describe('Error page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/contacts',
      },
      {
        fixture: 'contacts.json',
      },
    ).as('getContacts');

    cy.visit('/');
  });

  it('should display an error page when navigating to a non-existing route', () => {
    cy.visit('/random-page');

    cy.get('h1').contains('404');

    cy.get('h3').contains('Not Found');

    cy.getByTestId('navbar').should('not.exist');
  });
});
