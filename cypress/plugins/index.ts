import { defaultOptions } from "@cypress/browserify-preprocessor";
import cucumber from "cypress-cucumber-preprocessor";

export default async function cucumberConfig(on, config) {
	on(
		"file:preprocessor",
		cucumber.default({
			...defaultOptions,
			typescript: require.resolve("typescript"),
		})
	);

	return config;
}
