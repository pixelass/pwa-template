/// @ts-check
import process from "node:process";

import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache";
import transpileModules from "next-transpile-modules";

import { i18n } from "./next-i18next.config";

const withTM = transpileModules(["@mui/material"]); // Pass the modules you would like to see transpiled

/**
 *
 * @type {import('next').NextConfig} config
 */
const config = {
	i18n,
	reactStrictMode: true,
	pwa: {
		disable: process.env.NODE_ENV === "development",
		dest: "public",
		register: true,
		skipWaiting: true,
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/],
	},
};

export default withTM(withPWA(config));
