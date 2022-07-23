import { readFile, writeFile } from "node:fs/promises";

import { files } from "./shared.js";

async function prepare() {
	try {
		const pkg = JSON.parse(await readFile(files.pkg));
		delete pkg.type;
		await writeFile(files.pkg, JSON.stringify(pkg, null, 2));
	} catch (error) {
		console.error(error);
	}
}

prepare();
