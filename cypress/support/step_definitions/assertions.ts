import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(/^the page is displayed$/, function () {
	cy.get("#__next").should("exist");
});

Then(/^the dashboard is displayed$/, function () {
	cy.url().should("include", "/dashboard");
});
