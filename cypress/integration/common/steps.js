import { When } from "cypress-cucumber-preprocessor/steps";

When(/^the user is on the root page$/, function () {
	cy.visit("/");
});
