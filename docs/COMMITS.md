# Commits

We use [conventional commits](https://www.conventionalcommits.org/) in order to automatically define
versions and create a [changelog](../CHANGELOG.md). THis will help us keep a better overview of what
has changed over time or was added in the last version.

## Writing commits

All commits are linted, so you will not be able to commit until your message follows our rules.
Please read [conventional commits](https://www.conventionalcommits.org/) to get a better
understanding on why this is helpful and how this works. You can also look at
[Semantic Versioning](https://semver.org/) if you are interested in more detail about versioning.

### Good commit messages

A good commit message is important for us for several reasons:

1. Automate [Semantic Versions](https://semver.org/)
2. Automate [changelog](../CHANGELOG.md)
3. Give consumers and contributors a chance to easily understand what has been done

In general the following rule applies:

> Keep messages short and concise.

### Examples for different types of messages

#### Chore

Chore commits should be used in the following cases:

1. Update dependencies
2. Update scripts in package.json
3. Update files outside the [Source folder](../src)
4. Update configuration files

**Update dependencies:**

```
chore: update dependencies
## OR
chore(dependencies): update dependencies
```

**Update config files:**

```
chore: adjust xo configuration
## OR
chore(xo): update configuration
## OR
chore(hooks): add pre-commit hook
```

#### Docs

Docs commits should be used in the following cases:

1. Update [documentation files](./)
2. Update comments or doc-blocks in [source files](../src)

**Update documentation:**

```
docs: typo in readme
## OR
docs(button): api changes
```

#### Test

Test commits should be used in the following cases:

1. Update [test files](../cypress/integration)

**Update test:**

```
test: add test for signin
## OR
test(signin): added new test case
```

#### Fix

Fix commits should only contain bug-fixes.

**Fix bug:**

```
fix: checkbox state was inverted
## OR
fix(checkbox): checked state was inverted
## OR
fix(checkbox): state was inverted

checking a checkbox was wrong when the outside state changed

fixes: #123

```

#### Feat

Feature commits should be used for every feature-story.
Each story is on feature.

**Add feature:**

```
feat(signup): add signup screen
#OR
feat(signup): tighten password rules

BREAKING CHANGE Users might need to update their password
```
