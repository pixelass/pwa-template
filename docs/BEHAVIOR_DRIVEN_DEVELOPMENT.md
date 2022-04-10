# Behavior Driven Development

[Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) (abbr. BDD)
encourages teams to use conversation and concrete examples to formalize a shared understanding of
how the application should behave. BDD is largely facilitated through the use of a simple
[domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language) (DSL) using
natural-language constructs (e.g., English-like sentences) that can express the behaviour and the
expected outcomes.

## Gherkin

[Cucumber](https://cucumber.io/) uses
[Gherkin](<https://en.wikipedia.org/wiki/Cucumber_(software)#Gherkin_language>) to define test cases.
Its syntax centers around a line-oriented design, similar to that of Python.

### Example

```gherkin
Scenario: Eric wants to withdraw money from his bank account at an ATM
	Given Eric has a valid Credit or Debit card
	And his account balance is $100
	When he inserts his card
	And withdraws $45
	Then the ATM should return $45
	And his account balance is $55
```

## Best practices

### Common steps

We define common steps in namespaced files of the `common` folder i.e.
`/cypress/integration/common/steps.js`. These files contain steps that we want to repeat in
various tests.

**Example:** `/cypress/integration/common/steps.js`

```js
// helpers/index.js
// export const pages = {
//   root: "/",
//   about: "/about",
// };

Given(/^the user is on the "([^"]*)" page$/, function (page) {
  cy.visit(pages[page]);
});
```

### Writing tests

We write easy to understand, testable features.

1. Define a `Background` if given
1. Define a `Scenario` as often as given
1. Describe the expected behavior

**Example:** `/cypress/integration/Navigation.feature`

```gherkin
Feature: Navigation

  As a user,
  I want a navigation,
  so that I can navigate the app.

  Scenario: The user wants to navigate to the about page

    Given the user is on the "root" page
    When the user clicks on "About" in the navigation
    Then the "about" page is visible

  Scenario: The user wants to navigate to the root page

    Given the user is on the "about" page
    When the user clicks on "Home" in the navigation
    Then the "root" page is visible

```

The keywords `And` and `But` are syntactic sugar for `Given`, `When` and `Then`. They should not be
used in step definitions, use the corresponding keyword instead.

We separate steps and assertions:

**Example:** `/cypress/integration/common/steps.js`

```js
import { Given, When } from "cypress-cucumber-preprocessor/steps";
import { pages, dataTestId } from "../helpers";

Given(/^the user is on the "([^"]*)" page$/, function (page) {
  cy.visit(pages[page]);
});

When(/^the user clicks on "([^"]*)" in the navigation$/, function (text) {
  cy.get(dataTestId("navigation")).find("a").contains(text).click();
});

```

**Example:** `/cypress/integration/common/assertions.js`

```js
import { Then } from "cypress-cucumber-preprocessor/steps";
import { pages } from "../helpers";

Then(/^the "([^"]*)" page is visible$/, function (page) {
  cy.url().should("include", pages[page]);
});

```

### Test selectors

To ensure that tested elements can be selected we add
[`data-attributes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
to our target elements.

| Usage  | Pattern           | example                     | description                  |
| ------ | ----------------- | --------------------------- | ---------------------------- |
| ID     | `data-test-id`    | `data-test-id="my-element"` | Find element in the DOM      |

