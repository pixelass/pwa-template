import { Given, When } from "cypress-cucumber-preprocessor/steps";
import { dataTestId } from "../helpers";

Given(/^the user is on the root page$/, function () {
	cy.visit("/");
});

When(/^the user clicks the button$/, function () {
	cy.get(dataTestId("button")).click();
});
