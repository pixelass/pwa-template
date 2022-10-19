# PWA Template

A template for Next.js with PWA support and i18n.

<img src="./docs/resources/next-logo.png" alt="next logo" width="50%"/><img src="./docs/resources/pwa-logo.png" alt="pwa logo" width="50%"/>

<h2 align="center">100% Lighthouse score</h2>

<p align="center"><img src="./docs/resources/lighthouse.png" alt="next logo" width="600"/></p>

<!-- toc -->

- [Libraries](#libraries)
- [Personalize this template](#personalize-this-template)
  - [Automatic (recommended)](#automatic-recommended)
  - [Manual](#manual)
- [Project Setup](#project-setup)
  - [Set up Vercel](#set-up-vercel)
    - [App](#app)
    - [Storybook](#storybook)
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
- [Sentry](https://sentry.io/)
- [Jest](https://jestjs.io/)
- [Commitlint](https://commitlint.js.org/)
- [Stylelint](https://stylelint.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Additional libraries:

- [MUI](https://mui.com/)
- [i18next](https://www.i18next.com/) (via
  [next-i18next](https://github.com/isaachinman/next-i18next))
- [Next Auth](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## Personalize this template

### Automatic (recommended)

You can use the `setup` script by running:

```shell
yarn run setup
```

A prompt will guide you through the setup and adjust all files accordingly.  
After the setup all setup related configuration and files can be removed automatically.

<p align="center"><img src="./docs/resources/setup.svg" alt="next logo" width="600"/></p>

### Manual

> :warning: Warning
>
> We suggest using the automatic setup instead.

<details>
<summary>View the manual steps</summary>

You can adjust the template by searching for `/pwa[ -]template/i`. It should find all instances of
"pwa-template" or "PWA Template". Additionally, you should adjust the colors (`theme_color` and
`background_color`) in `public/manifest.json`.

Adjust the name in the LICENSE file.

**We also advise to remove all setup related configuration and files:**

- Remove `scripts.setup` in from `package.json`
- Remove `devDependencies.boxen` in from `package.json`
- Remove `devDependencies.chalk` in from `package.json`
- Remove `devDependencies.execa` in from `package.json`
- Remove `devDependencies.inquirer` in from `package.json`
- Remove `devDependencies.ora` in from `package.json`
- Delete the file `scripts/setup.mjs`.

**Here's a list of all files that should be adjusted:**

- `LICENSE`
- `package.json`
- `scripts/setup.mjs` (deleted)

</details>

## Project Setup

This project uses multiple Vercel deployments to make design/code reviews easier:

- App Production
- App Preview
- Storybook Production
- Storybook Preview

### Set up Vercel

Please follow this guide: https://vercel.com/docs/concepts/git

#### App

1. The "Project Name" should match what you entered when you
   [personalized this template](#personalize-this-template).
2. Follow the default setup for Next.js.

#### Storybook

1. Adjust the "Build and Output Settings"
   - BUILD COMMAND: `yarn run storybook:build`
   - OUTPUT DIRECTORY: `./storybook-static`

<p align="center"><img src="./docs/resources/vercel-storybook.png" alt="Vercel Storybook settings" width="600"/></p>

## Setup Sentry

Please look at [the guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/).
Especially the
[configuration](https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-sentry-cli)
section

Everything is already set up. You need to add the correct environmental variables (See
[`.env.local.example`](.env.local.example))

## Getting started

**Run the development server:**

```shell
yarn run dev
```

**Run storybook:**

```shell
yarn run storybook
```

## Atomic design

We use atomic design. You can read more about our decision in the
[documentation](docs/ATOMIC_DESIGN.md).

## Behavior Driven Development

We use behavior tests. You can read more about our decision in the
[documentation](docs/BEHAVIOR_DRIVEN_DEVELOPMENT.md).

## Test Driven Development

We use jest to write unit tests. Please look at the Documentation for [Jest](https://jestjs.io/) and
[testing-library](https://testing-library.com/docs/react-testing-library/intro/).

## Commitlint

We use commitlint to ensure conventional commit messages. You can read more about our decision in
the [documentation](docs/COMMITS.md).

## Commands

**Run the development server:**

```shell
yarn run dev
```

**Build:**

```shell
yarn run build
```

**Run storybook:**

```shell
yarn run storybook
```

**Build storybook:**

```shell
yarn run storybook:build
```

**Run cypress tests:**

```shell
yarn run cypress # local without server
# yarn cypress:run # headless
# yarn test:cypress # with server
```

**Run unit tests:**

```shell
yarn run jest
# yarn jest:watch # watch
# yarn test:jest # same as "yarn jest"
```

**Run all tests:**

```shell
yarn run test
```

**Run stylelint**

```shell
yarn run stylelint
```

**Run eslint**

```shell
yarn run eslint
```

**Run all linters**

```shell
yarn run lint
```

## Skipping linters

If you need to skip a linter you can add the `--no-verify` flag.

> :warning: Warning
>
> We strongly advise against skipping linters.

```shell
# Skipping pre-commit hooks
git commit README.md -m "this is a dirty commit" --no-verify
```
