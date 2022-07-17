import { When } from "@badeball/cypress-cucumber-preprocessor";

When(/^the user is on the root page$/, function () {
	cy.visit("/");
});
