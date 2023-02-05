describe('Homepage', () => {
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

  it('should display a list of contacts and a "Create new contact" button', () => {
    cy.contains('List of contacts');

    cy.getByTestId('createContactBtn').should('exist');

    cy.getByTestId('contactCard').should('have.length', 5);

    cy.wait('@getContacts').then((interception) => {
      expect(interception.response.body[0].name).to.equal('Tweety');
    });
  });

  it('should display a navbar with a single link which redirects to the homepage', () => {
    cy.getByTestId('navbar').should('exist');

    cy.visit('/contacts/new');

    cy.contains('Create a new contact');

    cy.getByTestId('navbar').get('a').click();

    cy.contains('List of contacts');
  });
});
