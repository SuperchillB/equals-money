/**
 * It takes an object of key/value pairs, and for each key/value pair, it finds an input with the name
 * of the key, types the value into the input, and asserts that the value was typed correctly
 * @param fields - Record<string, string>
 * @param parent - The parent element that contains the form.
 */
export const fillMultipleInputs = (
  fields: Record<string, string>,
  parent: Cypress.Chainable<JQuery<HTMLElement>>,
) => {
  Object.keys(fields).forEach((key) => {
    parent.within(($form) => {
      cy.get(`input[name="${key}"]`)
        .type(fields[key])
        .should('have.value', fields[key]);
    });
  });
};
