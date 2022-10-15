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
