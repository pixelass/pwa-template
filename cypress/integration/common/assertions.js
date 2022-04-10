import { Then } from "cypress-cucumber-preprocessor/steps";
import { dataTestId } from "../helpers";

Then(/^the count is "([^"]*)"$/, function (count) {
	cy.get(dataTestId("count")).should("contain", count);
});
