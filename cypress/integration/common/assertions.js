import { Then } from "cypress-cucumber-preprocessor/steps";
import { dataTestId } from "../helpers";

Then(/^the page is displayed$/, function () {
	cy.get("#__next").should("exist");
});
