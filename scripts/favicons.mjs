import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import favicons from "favicons";
import prettier from "prettier";

import pwaConfig from "../pwa.config.mjs";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

async function generatePWAFile(html) {
	const contents = `
	export default function PWAConfig() {
		return (
			<>
				${html.filter(tag => !tag.includes(`name="theme-color"`)).join("\n\t\t\t")}
			</>
		);
	}`;

	const options = await prettier.resolveConfig(__dirname, { editorconfig: true });
	return prettier.format(contents, { ...options, parser: "babel" });
}

// eslint-disable-next-line no-unused-vars
const { key, ...pwaConfig_ } = pwaConfig;

async function run(config) {
	const source = path.resolve(__dirname, "../resources/", `logo.png`);
	console.log("Generating Icons and screens...");
	try {
		const response = await favicons(source, config);
		const html = response.html.map(tag => tag.replace(">", " />"));
		const pwaFileContents = await generatePWAFile(html);
		const pwaFileDir = path.join(__dirname, "../src/molecules/pwa-config/");
		const dir = path.join(__dirname, "../public", config.path);
		await mkdir(pwaFileDir, { recursive: true });
		await mkdir(dir, { recursive: true });
		await writeFile(path.join(pwaFileDir, `index.tsx`), pwaFileContents);
		await Promise.all(
			response.images.map(async file => {
				await writeFile(path.join(dir, file.name), file.contents);
			})
		);
		await Promise.all(
			response.files.map(async file => {
				await writeFile(path.join(dir, file.name), file.contents);
				await writeFile(path.join(dir, file.name), file.contents);
			})
		);
		console.log("Icons and screens generated!");
	} catch (error) {
		console.log(error.message);
	}
}

void run({
	...pwaConfig_,
});
