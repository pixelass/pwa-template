# PWA Template

A template for Next.js with PWA support and i18n.

<img src="./docs/resources/next-logo.png" alt="next logo" width="50%"/><img src="./docs/resources/pwa-logo.png" alt="pwa logo" width="50%"/>

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
- [Jest](https://jestjs.io/)
- [Commitlint](https://commitlint.js.org/)
- [Stylelint](https://stylelint.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Additional libraries:

- [MUI](https://mui.com/)
- [i18next](https://www.i18next.com/) ([next-i18next](https://github.com/isaachinman/next-i18next))

## Personalize this template

### Automatic (recommended)

You can use the `setup` script by running:

```shell
yarn run setup
```

A prompt will guide you through the setup and adjust all files accordingly.  
After the setup all setup related configuration and files can be removed automatically.

### Manual

> :warning: Warning
>
> Please remove `"type": "module"` from `package.json`.  
> next-i18next [is not compatible with esm](https://github.com/i18next/next-i18next/issues/1505).

<details>
<summary>View the manual steps</summary>

You can adjust the template by searching for `/pwa[ -]template/i`. It should find all instances of
"pwa-template" or "PWA Template". Additionally, you should adjust the colors in
`public/manifest.json`.

We also advise to remove all setup related configuration and files:

- Remove `scripts.setup` in from `package.json`
- Remove `scripts.prebuild` in from `package.json`
- Change `scripts.build` in `package.json` to "next build"
- Change `scripts["storybook:build]` in `package.json` to "storybook-build"
- Remove `devDependencies.boxen` in from `package.json`
- Remove `devDependencies.chalk` in from `package.json`
- Remove `devDependencies.fullname` in from `package.json`
- Remove `devDependencies.inquirer` in from `package.json`
- Remove `devDependencies.ora` in from `package.json`
- Remove `- run: yarn run prebuild` in from `.github/workflows/Code_Quality.yml`
- Remove `- run: yarn run prebuild` in from `.github/workflows/Run_Tests.yml`
- Adjust `- if: …` in from `.github/workflows/Run_Cypress.yml` to end with
  `github.event.deployment_status.environment == 'Preview – {project-name}'` where `{project-name}` is
  the name of the Vercel project.
- Remove `- run: yarn install` in from `.github/workflows/Run_Cypress.yml`
- Remove `- run: yarn run prebuild` in from `.github/workflows/Run_Cypress.yml`
- Delete the directory `scripts`.

Here's a list of all files that should be adjusted:

- `.github/workflows/Code_Quality.yml`
- `.github/workflows/Run_Tests.yml`
- `.github/workflows/Run_Cypress.yml`
- `package.json`
- `public/manifest.json`
- `src/pages/_app.tsx`
- `/src/pages/_document.tsx`
- `src/ions/configs/emotion.ts`
- `scripts` (deleted)

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

<img src="./docs/resources/vercel-storybook.png" alt="Vercel Storybook settings" width="600"/>

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

We use jest to write unit tests. Please look at the Documentation for [Jest](https://jestjs.io/)
and [testing-library](https://testing-library.com/docs/react-testing-library/intro/).

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
