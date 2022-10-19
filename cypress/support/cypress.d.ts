/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-cy attribute.
		 * @example cy.dataCy("greeting")
		 */
		dataCy(value: string): Chainable<JQuery<Element>>;
		dataTestId(value: string): Chainable<JQuery<Element>>;
		login(userObj: Record<string, string>): Chainable;
		logout(): Chainable;
		gql(
			operations: Array<{ operationName: string; data: string; alias: string }>
		): Chainable<Element>;
	}
}
