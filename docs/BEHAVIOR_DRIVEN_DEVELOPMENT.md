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
import { When } from "cypress-cucumber-preprocessor/steps";

When(/^the user is on the root page$/, function () {
  cy.visit("/");
});
```

### Writing tests

We write easy to understand, testable features.

1. Define a `Background` if given
1. Define a `Scenario` as often as given
1. Describe the expected behavior

**Example:** `/cypress/integration/Load.feature`

```gherkin
Feature: Load

  As a user,
  I want to see the page,
  so that I can use the app.

  Scenario: The user wants to see the page

    When the user is on the root page
    Then the page is displayed
```

The keywords `And` and `But` are syntactic sugar for `Given`, `When` and `Then`. They should not be
used in step definitions, use the corresponding keyword instead.

We separate steps and assertions:

**Example:** `/cypress/integration/common/steps.js`

```js
import { When } from "cypress-cucumber-preprocessor/steps";

When(/^the user is on the root page$/, function () {
  cy.visit("/");
});
```

**Example:** `/cypress/integration/common/assertions.js`

```js
import { Then } from "cypress-cucumber-preprocessor/steps";

Then(/^the page is displayed$/, function () {
  cy.get("#__next").should("exist");
});
```

### Test selectors

To ensure that tested elements can be selected we add
[`data-attributes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
to our target elements.

| Usage | Pattern        | example                     | description             |
| ----- | -------------- | --------------------------- | ----------------------- |
| ID    | `data-test-id` | `data-test-id="my-element"` | Find element in the DOM |

## Resources:

- User stories and BDD: https://cucumber.io/blog/bdd/user-stories-are-not-the-same-as-features/
- Gherkin reference: https://cucumber.io/docs/gherkin/reference/
