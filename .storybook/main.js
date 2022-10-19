const path = require("path");

const toPath = path_ => path.join(process.cwd(), path_);

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "storybook-addon-next",
			options: {
				nextConfigPath: path.resolve(__dirname, "./nextConfig.js"),
			},
		},
		"storybook-react-i18next",
	],
	framework: "@storybook/react",
	typescript: { reactDocgen: true },
	core: {
		builder: "webpack5",
	},
	webpackFinal: async config => {
		config.resolve.alias = {
			...config.resolve.alias,
			fs: path.resolve(__dirname, "fs.js"),
		};
		config.resolve.fallback = {
			fs: false,
			tls: false,
			net: false,
			module: false,
			path: require.resolve("path-browserify"),
		};
		config.resolve.alias = {
			...config.resolve.alias,
			"@emotion/core": toPath("node_modules/@emotion/react"),
			"emotion-theming": toPath("node_modules/@emotion/react"),
			"@": toPath("src"),
		};
		return config;
	},
};
