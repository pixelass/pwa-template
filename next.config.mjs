/// @ts-check
import process from "node:process";

import { withSentryConfig } from "@sentry/nextjs";
import nextPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
import transpileModules from "next-transpile-modules";

import i18next from "./next-i18next.config.js";

const withTM = transpileModules(["@mui/material"]); // Pass the modules you would like to see transpiled

const withPWA = nextPWA({
	disable: process.env.NODE_ENV === "development",
	dest: "public",
	register: true,
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/],
});

/**
 *  Make sentry compatible for plugin composer
 * @param nextConfig
 * @returns {import('next').NextConfigFunction}
 */
function withSentry(nextConfig) {
	return withSentryConfig(nextConfig, {
		silent: true,
		dryRun: process.env.VERCEL_ENV !== "production",
	});
}

/**
 *
 * @param plugins
 * @param {import('next').NextConfig} nextConfig
 * @returns {import('next').NextConfigObject}
 */
function withPlugins(plugins, nextConfig) {
	return plugins.reduce((previousValue, currentValue) => currentValue(previousValue), nextConfig);
}

/**
 *
 * @type {import('next').NextConfig} config
 */
const config = {
	i18n: i18next.i18n,
	reactStrictMode: true,
	swcMinify: true,
	productionBrowserSourceMaps: false,
	compiler: {
		// Allows to remove JSX properties. This is often used for testing.
		// Similar to babel-plugin-react-remove-properties.
		// To remove properties matching the default regex ^data-test:
		// reactRemoveProperties: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		formats: ["image/webp"],
	},
	sentry: {
		hideSourceMaps: true,
	},
};

export default withPlugins([withPWA, withTM, withSentry], config);
