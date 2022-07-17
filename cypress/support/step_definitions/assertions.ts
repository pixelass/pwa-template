import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(/^the page is displayed$/, function () {
	cy.get("#__next").should("exist");
});
