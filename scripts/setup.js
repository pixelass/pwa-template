import { readFile, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";

import boxen from "boxen";
import chalk from "chalk";
import fullName from "fullname";
import inquirer from "inquirer";
import ora from "ora";

import { __dirname, files } from "./shared.js";

const questions = [
	{
		type: "input",
		name: "projectName",
		message: "What's your project name",
		default() {
			return "pwa-template";
		},
		validate(value) {
			return Boolean(/^[a-z\d-.]+$/.exec(value)) || "Please use a-z 0-9 - . only.";
		},
	},
	{
		type: "input",
		name: "author",
		message: "What's your name",
		async default() {
			return (await fullName()) ?? "Fred Flintstone";
		},
	},
	{
		type: "input",
		name: "pageTitle",
		message: "What's your default page title",
		default() {
			return "PWA Template";
		},
	},
	{
		type: "input",
		name: "pwaName",
		message: "What's your default PWA name",
		default() {
			return "PWA Template";
		},
	},
	{
		type: "input",
		name: "pwaShortName",
		message: "What's your default PWA short name",
		default() {
			return "PWA Template";
		},
	},
	{
		type: "input",
		name: "pwaThemeColor",
		message: "What's your pwa theme color",
		default() {
			return "#9fa8da";
		},
	},
	{
		type: "input",
		name: "pwaBackgroundColor",
		message: "What's your pwa background color",
		default() {
			return "#121212";
		},
	},
];
const spinner = ora("Setup");
inquirer
	.prompt(questions)
	.then(
		async ({
			author,
			projectName,
			pageTitle,
			pwaName,
			pwaShortName,
			pwaThemeColor,
			pwaBackgroundColor,
		}) => {
			try {
				spinner.text = "Reading files…";
				spinner.start();
				const pkg = JSON.parse(await readFile(files.pkg));
				const manifest = JSON.parse(await readFile(files.manifest));
				let _app = await readFile(files._app, "utf-8");
				let _document = await readFile(files._document, "utf-8");
				let emotion = await readFile(files.emotion, "utf-8");
				spinner.text = "Modifying files…";
				// Adjust package.json
				pkg.name = projectName;
				pkg.author = author;
				delete pkg.type;
				// Adjust public/manifest.json
				manifest.name = pwaName;
				manifest.short_name = pwaShortName;
				manifest.theme_color = pwaThemeColor;
				manifest.background_color = pwaBackgroundColor;
				// Adjust src/ions/configs/emotion.ts
				emotion = emotion.replace("pwa-template", projectName.trim());
				// Adjust src/pages/_app.tsx
				_app = _app.replace(
					`<title key="title">pwa-template</title>`,
					`<title key="title">${pageTitle.trim()}</title>`
				);
				// Adjust src/pages/_document.tsx
				_document = _document
					.replace(
						`<meta name="apple-mobile-web-app-title" content="pwa-template" />`,
						`<meta name="apple-mobile-web-app-title" content="${pwaName.trim()}" />`
					)
					.replace(
						`<meta name="application-name" content="pwa-template" />`,
						`<meta name="application-name" content="${pwaName.trim()}" />`
					);
				await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
				await writeFile(files.manifest, JSON.stringify(manifest, null, 2));
				await writeFile(files.emotion, emotion);
				await writeFile(files._app, _app);
				await writeFile(files._document, _document);
				spinner.succeed("The project setup is done.");
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
					delete pkg.scripts.setup;
					delete pkg.devDependencies.boxen;
					delete pkg.devDependencies.chalk;
					delete pkg.devDependencies.fullname;
					delete pkg.devDependencies.inquirer;
					delete pkg.devDependencies.ora;
					await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
					await rmdir(path.join(__dirname, "setup"), { recursive: true });
					console.log("\n");
					console.log(
						boxen(
							[
								chalk.yellow(
									"All setup related configuration and files have been deleted."
								),
								"\n\n",
								chalk.green(
									"Please run 'yarn install' to update the yarn.lock file."
								),
							].join(""),
							{ padding: 1, margin: 1 }
						)
					);
				}
			} catch (error) {
				spinner.fail("Something went wrong.");
				console.error(error);
			}
		}
	)
	.catch(error => {
		spinner.fail("Something went wrong.");
		console.error(error);
	});
