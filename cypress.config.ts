import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import * as Cypress from "cypress";
import { config } from "dotenv";
config({ path: ".env.local" });

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
	return config;
}

export default defineConfig({
	retries: {
		// Configure retry attempts for `cypress run`
		// Default is 0
		runMode: 1,
		// Configure retry attempts for `cypress open`
		// Default is 0
		openMode: 0,
	},
	e2e: {
		baseUrl: "http://localhost:3000",
		specPattern: "cypress/**/*.feature",
		setupNodeEvents,
	},
	env: {
		NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
	},
});
