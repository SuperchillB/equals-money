describe('New contact page', () => {
  const inputFields = {
    avatar: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg',
    name: 'Temporary contact',
    email: 'temp@test.com',
    phone: '1234567890',
    birthday: '26/01/1978',
  };

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/contacts',
      },
      {
        fixture: 'tempContacts.json',
      },
    ).as('getContacts');

    cy.visit('/');
    cy.wait('@getContacts');

    // Load the last contact
    cy.fixture('tempContacts.json').then((contacts) => {
      cy.intercept(
        {
          method: 'GET',
          url: '**/contacts/111',
        },
        contacts[contacts.length - 1],
      ).as('getContact');
    });

    cy.getByTestId('contactCard')
      .last()
      .within(($card) => {
        cy.wrap($card).get('a').click({ force: true });

        cy.wait('@getContact').then(() => {
          cy.url().should('include', '/contacts/111');
        });
      });
  });

  it('should display a form of 6 inputs with filled values', () => {
    cy.contains(inputFields.name);
    cy.contains('111');

    cy.getByTestId('contactForm').within(($form) => {
      Object.keys(inputFields).forEach((key) => {
        cy.get(`input[name="${key}"]`).should('have.value', inputFields[key]);
      });
    });
  });

  it('should allow users to update a contact', () => {
    const newName = 'Updated name';
    const newEmail = 'updated@email.com';

    cy.getByTestId('contactForm').within(($form) => {
      cy.get('input[name="name"]')
        .clear()
        .type(newName)
        .should('have.value', newName);
      cy.get('input[name="email"]')
        .clear()
        .type(newEmail)
        .should('have.value', newEmail);

      cy.fixture('tempContacts.json').then((contacts) => {
        const updatedContactIndex = contacts.findIndex(
          (obj) => obj.id === '111',
        );
        contacts[updatedContactIndex].name = newName;
        contacts[updatedContactIndex].email = newEmail;
        cy.intercept(
          {
            method: 'PUT',
            url: '**/contacts/111',
          },
          contacts,
        ).as('updateContact');
      });

      cy.get('button[type="submit"]').click();
    });

    cy.wait('@updateContact').then((interception) => {
      const { request, response } = interception;
      expect(request.body.name).to.eq(newName);
      expect(request.body.email).to.eq(newEmail);
      expect(response.body).to.have.length(6);
      expect(response.body[response.body.length - 1].name).to.equal(newName);
      expect(response.body[response.body.length - 1].email).to.equal(newEmail);
    });
  });

  it('should allow users to delete selected contact', () => {
    cy.fixture('tempContacts.json').then((contacts) => {
      cy.intercept(
        {
          method: 'DELETE',
          url: '**/contacts/111',
        },
        contacts[contacts.length - 1],
      ).as('deleteContact');
    });

    cy.getByTestId('deleteContactBtn').should('exist').click({ force: true });
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Do you really want to delete this contact?');
      return true;
    });

    cy.wait('@deleteContact').then((interception) => {
      const { response } = interception;
      expect(response.body.name).to.eq(inputFields.name);
      expect(response.body.email).to.eq(inputFields.email);
    });

    cy.contains('List of contacts');
  });

  it('should allow users to cancel their delete', () => {
    cy.getByTestId('deleteContactBtn').should('exist').click({ force: true });
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Do you really want to delete this contact?');
      return false;
    });

    cy.contains('Temporary contact');
  });
});
