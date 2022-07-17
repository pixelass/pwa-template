import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import * as Cypress from "cypress";

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
	await addCucumberPreprocessorPlugin(on, config);

	on(
		"file:preprocessor",
		webpack({
			webpackOptions: {
				resolve: {
					extensions: [".ts", ".js"],
				},
				module: {
					rules: [
						{
							test: /\.ts$/,
							exclude: [/node_modules/],
							use: [
								{
									loader: "babel-loader",
								},
							],
						},
						{
							test: /\.feature$/,
							use: [
								{
									loader: "@badeball/cypress-cucumber-preprocessor/webpack",
									options: config,
								},
							],
						},
					],
				},
			},
		})
	);
}

export default defineConfig({
	retries: 0,
	e2e: {
		baseUrl: "http://localhost:3000",
		specPattern: "cypress/**/*.feature",
		setupNodeEvents,
	},
});
