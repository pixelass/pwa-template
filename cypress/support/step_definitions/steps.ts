import { When } from "@badeball/cypress-cucumber-preprocessor";

When(/^the user is on the root page$/, function () {
	cy.visit("/");
});

When(/^the user is logged in$/, function () {
	cy.login({
		id: "1",
		name: "Alex Morrison",
		email: "alex.morrison@example.com",
		image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
	});
});

When(/^the user logs out$/, function () {
	cy.dataCy("user-menu:button").click();
	cy.dataCy("user-menu:menu").should("be.visible");
	cy.dataCy("user-menu:signOut").click();
});

When(/^the clicks on profile$/, function () {
	cy.dataCy("sidebar:menu.profile").eq(0).click();
});

When(/^the clicks on collapse$/, function () {
	cy.dataCy("sidebar:collapse").click();
});

When(/^the user is on mobile$/, function () {
	cy.viewport("iphone-8");
});

When(/^the user click the mobile sidebar button$/, function () {
	cy.dataCy("sidebar:header.toggle").click();
});
