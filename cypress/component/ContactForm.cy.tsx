import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ContactForm from '../../src/components/_forms/ContactForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/index.scss';
import { fillMultipleInputs } from '../support/utils';

const fields: Record<string, string> = {
  avatar: 'test',
  name: 'test',
  email: 'test@email.com',
  phone: '012345678',
  birthday: '01/01/1990',
};

const fillAndSubmit = (fieldsToFill = fields) => {
  cy.getByTestId('contactForm').then(($form) => {
    fillMultipleInputs(fieldsToFill, cy.getByTestId('contactForm'));

    cy.wrap($form).submit();

    cy.getByTestId('contactForm')
      .submit()
      .find('.form-control:valid')
      .should('have.length', 6);
  });
};

describe('<ContactForm />', () => {
  beforeEach(() => {
    cy.viewport(1200, 900);

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ContactForm />,
        },
      ],
      {
        initialEntries: ['/'],
      },
    );

    cy.mount(<RouterProvider router={router} />);

    cy.getByTestId('contactForm').then(($form) => {
      $form.on('submit', (e) => {
        e.preventDefault();
      });
    });
  });

  it('should render', () => {
    cy.contains('Avatar URL');

    cy.getByTestId('contactForm')
      .find('div.invalid-feedback')
      .should('have.length', 5)
      .each(($err) => {
        cy.wrap($err)
          .invoke('css', 'display')
          .then(($display) => {
            expect($display).to.eq('none');
          });
      });
  });

  it('should display a form of 5 non-file inputs with empty values and one file input', () => {
    cy.getByTestId('contactForm')
      .find('input:not([type="file"])')
      .should('have.length', 5)
      .each(($el) => {
        cy.wrap($el).should('have.value', '').and('have.attr', 'required');
      });

    cy.getByTestId('contactForm')
      .find('input[type="file"]')
      .should('have.length', 1);
  });

  it('should not pass validation if fields are left empty', () => {
    cy.getByTestId('contactForm')
      .submit()
      .find('div.invalid-feedback')
      .should('have.length', 5)
      .each(($err) => {
        cy.wrap($err)
          .invoke('css', 'display')
          .then(($display) => {
            expect($display).to.eq('block');
          });
      });
  });

  it('should not pass validation if email, phone or birthday fields are not filled properly', () => {
    let newFields = {
      ...fields,
      email: 'test',
      phone: 'test',
      birthday: 'test',
    };

    fillMultipleInputs(newFields, cy.getByTestId('contactForm'));

    cy.getByTestId('contactForm')
      .submit()
      .find('.form-control:valid')
      .should('have.length', 3);
    cy.contains('Please choose a valid email');
    cy.contains('Please enter a valid phone number');
    cy.contains('Please enter your birthday');

    cy.getByTestId('contactForm')
      .get('input[name="birthday"]')
      .clear()
      .type('02/01//1990')
      .should('have.value', '02/01//1990');

    cy.getByTestId('contactForm')
      .submit()
      .find('.form-control:valid')
      .should('have.length', 3);
  });

  it('should submit the form if all fields pass validation', () => {
    fillAndSubmit();
  });

  it('should allow users to upload their own avatar', () => {
    cy.getByTestId('contactForm').within(() => {
      // Avatar input should be empty
      cy.get('input[name="avatar"]').should('be.empty');

      cy.get('input[type="file"]').selectFile('./public/placeholder-image.jpg');

      // Avatar input is now filled
      cy.get('input[name="avatar"]')
        .invoke('val')
        .then(($val) => expect(($val as string).length).to.be.gt(0));
    });

    const { avatar, ...rest } = fields;
    fillAndSubmit({ ...rest });
  });
});
