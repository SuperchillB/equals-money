describe('New contact page', () => {
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
    cy.wait('@getContacts');
    cy.getByTestId('createContactBtn').should('exist').click({ force: true });
    cy.url().should('include', '/contacts/new');
  });

  it('should display a form of 6 inputs with empty values', () => {
    cy.contains('Create a new contact');
    cy.getByTestId('contactForm')
      .find('input')
      .should('have.length', 6)
      .each(($el) => {
        cy.wrap($el).should('have.value', '');
      });
  });

  it('should allow users to fill in a form and create a new contact', () => {
    const inputFields = {
      avatar:
        'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
      name: 'New contact',
      email: 'newcontact@email.com',
      phone: '07991122345',
      birthday: '14/11/1973',
    };

    cy.fixture('contacts.json').then((contacts) => {
      contacts.push(inputFields);
      cy.intercept(
        {
          method: 'POST',
          url: '**/contacts',
        },
        contacts,
      ).as('createContact');
    });

    cy.getByTestId('contactForm').within(($form) => {
      Object.keys(inputFields).forEach((key) => {
        cy.get(`input[name="${key}"]`)
          .type(inputFields[key])
          .should('have.value', inputFields[key]);
      });

      // Image shows up correctly in the placeholder
      cy.get('figure img').should('have.attr', 'src', inputFields.avatar);

      cy.wrap($form).submit();
    });

    cy.wait('@createContact').then((interception) => {
      const { request, response } = interception;
      expect(request.body.name).to.eq(inputFields.name);
      expect(response.body).to.have.length(6);
      expect(response.body[response.body.length - 1].name).to.equal(
        inputFields.name,
      );
    });
  });
});
