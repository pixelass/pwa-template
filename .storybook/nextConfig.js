/// @ts-check
const transpileModules = require("next-transpile-modules");

const i18next = require("../next-i18next.config.js");

const withTM = transpileModules(["@mui/material"]); // Pass the modules you would like to see transpiled

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
	compiler: {
		reactRemoveProperties: true,
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
};

module.exports = withPlugins([withTM], config);
