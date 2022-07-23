import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const files = {
	pkg: path.join(__dirname, "../package.json"),
	manifest: path.join(__dirname, "../public/manifest.json"),
	_app: path.join(__dirname, "../src/pages/_app.tsx"),
	_document: path.join(__dirname, "../src/pages/_document.tsx"),
	emotion: path.join(__dirname, "../src/ions/configs/emotion.ts"),
};
