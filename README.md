# PWA Template

A template for Next.js with PWA support and i18n.

<img src="./docs/resources/next-logo.png" alt="next logo" width="50%"/><img src="./docs/resources/pwa-logo.png" alt="pwa logo" width="50%"/>

<!-- toc -->

- [Libraries](#libraries)
- [Project Setup](#project-setup)
  - [Set up Vercel](#set-up-vercel)
  - [Setup GitHub Pages](#setup-github-pages)
  - [Setup Surge](#setup-surge)
- [Getting started](#getting-started)
- [Atomic design](#atomic-design)
- [Behavior Driven Development](#behavior-driven-development)
- [Test Driven Development](#test-driven-development)
- [Commitlint](#commitlint)
- [Commands](#commands)
- [Skipping linters](#skipping-linters)

<!-- tocstop -->

## Libraries

- [Storybook](https://storybook.js.org/)
- [Cypress](https://cypress.io/)
- [Jest](https://jestjs.io/)
- [Commitlint](https://commitlint.js.org/)
- [Stylelint](https://stylelint.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Additional libraries:

- [MUI](https://mui.com/)
- [i18next](https://www.i18next.com/) ([next-i18next](https://github.com/isaachinman/next-i18next))

## Project Setup

This project uses different deployments to make code reviews easier:

- Vercel (App Production)
- Vercel (App Preview)
- GitHub Pages (Storybook Production)
- Surge (Storybook Preview)

### Set up Vercel

Please follow this guide: https://vercel.com/docs/concepts/git

### Setup GitHub Pages

Please follow this guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Use the `gh-pages` branch

### Setup Surge

To generate a surge token please use the following command

```shell
npx surge token
```

It will output something like this:

```shell
$ npx surge token

   1234567890abcdefghijklmnopqrstuv
```

Add this token to your [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## Getting started

**Run the development server:**

```bash
yarn dev
```

**Run storybook:**

```shell
yarn storybook
```

## Atomic design

We use atomic design. You can read more about our decision in the
[documentation](docs/ATOMIC_DESIGN.md).

## Behavior Driven Development

We use behavior tests. You can read more about our decision in the
[documentation](docs/BEHAVIOR_DRIVEN_DEVELOPMENT.md).

## Test Driven Development

We use jest to write unit tests. Please look at the Documentation for [Jest](https://jestjs.io/)
and [testing-library](https://testing-library.com/docs/react-testing-library/intro/).

## Commitlint

We use commitlint to ensure conventional commit messages. You can read more about our decision in
the [documentation](docs/COMMITS.md).

## Commands

**Run the development server:**

```bash
yarn dev
```

**Build:**

```shell
yarn build
```

**Run storybook:**

```shell
yarn storybook
```

**Build storybook:**

```shell
yarn storybook:build
```

**Run cypress tests:**

```shell
yarn cypress # local without server
# yarn cypress:run # headless
# yarn test:cypress # with server
```

**Run unit tests:**

```shell
yarn jest
# yarn jest:watch # watch
# yarn test:jest # same as "yarn jest"
```

**Run all tests:**

```shell
yarn test
```

**Run stylelint**

```shell
yarn stylelint
```

**Run eslint**

```shell
yarn eslint
```

**Run all linters**

```shell
yarn lint
```

## Skipping linters

If you need to skip a linter you can add the `--no-verify` flag.

> Warning! We strongly advise against skipping linters.

```shell
# Skipping pre-commit hooks
git commit README.md -m "this is a dirty commit" --no-verify
```
