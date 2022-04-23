import { Then } from "cypress-cucumber-preprocessor/steps";

Then(/^the page is displayed$/, function () {
	cy.get("#__next").should("exist");
});
