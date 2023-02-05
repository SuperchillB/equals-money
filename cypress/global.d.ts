export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(
        dataTestAttribute: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
