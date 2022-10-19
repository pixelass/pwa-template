import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import boxen from "boxen";
import chalk from "chalk";
import { execa } from "execa";
import inquirer from "inquirer";
import ora from "ora";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import pwaConfig from "../pwa.config.mjs";

export const files = {
	pkg: path.join(__dirname, "../package.json"),
	license: path.join(__dirname, "../LICENSE"),
	_document: path.join(__dirname, "../src/pages/_document.tsx"),
};

async function getFiles() {
	const pkg = JSON.parse(await readFile(files.pkg, "utf-8"));
	const license = await readFile(files.license, "utf-8");
	return {
		json: { pkg },
		plain: { license },
	};
}

async function setup(write = true) {
	const spinner = ora("Setup");

	try {
		const {
			json: { pkg },
			plain: { license },
		} = await getFiles();

		const { developerName: authorName, developerURL: authorURL } = pwaConfig;
		const { projectName, description } = await inquirer.prompt([
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
					return pkg.description;
				},
			},
		]);
		spinner.text = "Modifying files…";
		spinner.start();

		// Adjust package.json
		// Set name and author
		pkg.name = projectName;
		pkg.description = description;
		pkg.author.name = authorName;
		pkg.author.url = authorURL;

		// Adjust LICENSE
		let license_ = license
			.replace("2022", new Date().getUTCFullYear().toString())
			.replace("Gregor Adams", authorName);

		if (write) {
			// Write modified files
			await writeFile(files.license, license_);
		} else {
			console.log(files.license, license_);
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
			delete pkg.devDependencies.execa;
			delete pkg.devDependencies.inquirer;
			delete pkg.devDependencies.ora;

			if (write) {
				await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
				await rm(__filename);
				await execa("yarn", ["install"]);
			} else {
				console.log(files.pkg, JSON.stringify(pkg, null, 2));
			}

			console.log(
				boxen(
					[
						chalk.yellow("Setup done with cleanup."),
						"\n\n",
						chalk.green("All setup related configuration and files have been deleted."),
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
