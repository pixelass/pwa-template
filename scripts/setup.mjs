import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import boxen from "boxen";
import chalk from "chalk";
import fullName from "fullname";
import inquirer from "inquirer";
import ora from "ora";
import YAML from "yaml";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const files = {
	pkg: path.join(__dirname, "../package.json"),
	manifest: path.join(__dirname, "../public/manifest.json"),
	_app: path.join(__dirname, "../src/pages/_app.tsx"),
	_document: path.join(__dirname, "../src/pages/_document.tsx"),
	emotion: path.join(__dirname, "../src/ions/configs/emotion.ts"),
};

export const workflows = {
	runCypress: path.join(__dirname, "../.github/workflows/Run_Cypress.yml"),
};

async function getFiles() {
	const pkg = JSON.parse(await readFile(files.pkg));
	const manifest = JSON.parse(await readFile(files.manifest));
	const runCypress = YAML.parse(await readFile(workflows.runCypress, "utf-8"));
	const _app = await readFile(files._app, "utf-8");
	const _document = await readFile(files._document, "utf-8");
	const emotion = await readFile(files.emotion, "utf-8");
	return {
		json: { pkg, manifest },
		yml: { runCypress },
		ts: { _app, _document, emotion },
	};
}

function getTitle(input) {
	const matches = /<title key="title">(.*)<\/title>/.exec(input);
	return matches ? matches[1] : null;
}
function getDescription(input) {
	const matches = /<meta\s+key="description"\s+name="description"\s+content="(.*)"\s+?\/>/.exec(
		input
	);
	return matches ? matches[1] : null;
}

async function setup(write = true) {
	const spinner = ora("Setup");

	try {
		const {
			json: { pkg, manifest },
			yml: { runCypress },
			ts: { _app, _document, emotion },
		} = await getFiles();

		const {
			author,
			projectName,
			description,
			pageTitle,
			pwaName,
			pwaShortName,
			pwaThemeColor,
			pwaBackgroundColor,
		} = await inquirer.prompt([
			{
				type: "input",
				name: "projectName",
				message: "Project Name",
				default() {
					return pkg.name;
				},
				validate(value) {
					return Boolean(/^[a-z\d-.]+$/.exec(value)) || "Please use a-z 0-9 - . only.";
				},
			},
			{
				type: "input",
				name: "description",
				message: "Description",
				default() {
					return getDescription(_app) ?? pkg.description;
				},
			},
			{
				type: "input",
				name: "author",
				message: "Author",
				async default() {
					return await fullName();
				},
			},
			{
				type: "input",
				name: "pageTitle",
				message: "Page Title",
				default() {
					return getTitle(_app);
				},
			},
			{
				type: "input",
				name: "pwaName",
				message: "PWA name",
				default() {
					return manifest.name;
				},
			},
			{
				type: "input",
				name: "pwaShortName",
				message: " PWA short name",
				default() {
					return manifest.short_name;
				},
			},
			{
				type: "input",
				name: "pwaThemeColor",
				message: "PWA theme color",
				default() {
					return manifest.theme_color;
				},
			},
			{
				type: "input",
				name: "pwaBackgroundColor",
				message: "PWA background color",
				default() {
					return manifest.background_color;
				},
			},
		]);
		spinner.text = "Modifying files…";
		spinner.start();

		// Adjust the condition if the cypress tests should run.
		// Cypress should only run for preview deployments of the main project (App).
		runCypress.jobs.test.if = `github.event.deployment_status.state == 'success' && github.event.deployment_status.environment == 'Preview – ${projectName}'`;

		// Adjust package.json
		// Set name and author
		pkg.name = projectName;
		pkg.author = author;

		// Adjust public/manifest.json
		manifest.name = pwaName;
		manifest.short_name = pwaShortName;
		manifest.theme_color = pwaThemeColor;
		manifest.background_color = pwaBackgroundColor;

		// Adjust src/ions/configs/emotion.ts
		// Set the key for emotion-cache
		let emotion_ = emotion.replace("pwa-template", projectName.trim());

		// Adjust src/pages/_app.tsx
		// Populate title and description
		let _app_ = _app.replace(
			`<title key="title">PWA Template</title>`,
			`<title key="title">${pageTitle.trim()}</title>`
		);
		_app_ = _app_.replace(
			`content="PWA template with Next.js and MUI"`,
			`content="${description}"`
		);

		// Adjust src/pages/_document.tsx
		// Populate app-title and application-name
		let _document_ = _document
			.replace(
				`<meta name="apple-mobile-web-app-title" content="pwa-template" />`,
				`<meta name="apple-mobile-web-app-title" content="${pwaName.trim()}" />`
			)
			.replace(
				`<meta name="application-name" content="pwa-template" />`,
				`<meta name="application-name" content="${pwaName.trim()}" />`
			);

		if (write) {
			// Write modified files
			await writeFile(files.manifest, JSON.stringify(manifest, null, 2));
			await writeFile(files.emotion, emotion_);
			await writeFile(files._app, _app_);
			await writeFile(files._document, _document_);
			await writeFile(workflows.runCypress, YAML.stringify(runCypress, null, 2));
		}
		spinner.succeed("The project setup is done.");

		// Ask if the project should be cleaned of unnecessary code
		const { cleanup } = await inquirer.prompt([
			{
				type: "confirm",
				name: "cleanup",
				message: "Do you want to delete all setup related configuration and files?",
				default() {
					return true;
				},
			},
		]);
		if (cleanup) {
			// Remove all setup scripts and dependencies from package.json
			delete pkg.scripts.setup;
			delete pkg.devDependencies.boxen;
			delete pkg.devDependencies.chalk;
			delete pkg.devDependencies.fullname;
			delete pkg.devDependencies.inquirer;
			delete pkg.devDependencies.ora;
			delete pkg.devDependencies.yaml;

			if (write) {
				await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
				await rm(path.join(__dirname), { recursive: true });
			}

			console.log(
				boxen(
					[
						chalk.yellow("Setup done with cleanup."),
						"\n\n",
						chalk.green("All setup related configuration and files have been deleted."),
						"\n\n",
						"Please run 'yarn install' to update the yarn.lock file.",
					].join(""),
					{ padding: 1, margin: 1 }
				)
			);
		} else {
			if (write) {
				await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
			}

			console.log(
				boxen(chalk.yellow("Setup done without cleanup."), {
					padding: 1,
					margin: 1,
				})
			);
		}
	} catch (error) {
		spinner.fail(error.message);
		console.error(error);
	}
}

void setup();
