import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then(/^the page is displayed$/, function () {
	cy.get("#__next").should("exist");
});

Then(/^the user is on the dashboard page$/, function () {
	cy.url().should("include", "/dashboard");
});

Then(/^the user is on the login page$/, function () {
	cy.url().should("include", "/auth/sign-in");
});

Then(/^the user is on the profile page$/, function () {
	cy.url().should("include", "/profile");
});

Then(/^the user sees the sidebar$/, function () {
	cy.dataCy("sidebar:desktop").should("be.visible");
});

Then(/^the user sees the sidebar collapsed$/, function () {
	cy.dataCy("sidebar:desktop.collapsed").should("be.visible");
});

Then(/^the user sees the mobile sidebar button$/, function () {
	cy.dataCy("sidebar:header.toggle").should("be.visible");
});

Then(/^the user sees the mobile sidebar$/, function () {
	cy.dataCy("sidebar:mobile").should("be.visible");
});
