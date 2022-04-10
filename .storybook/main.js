const path = require("path");
const toPath = path_ => path.join(process.cwd(), path_);

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	framework: "@storybook/react",
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve("babel-loader"),
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-typescript",
							"@babel/preset-react",
						],
						plugins: [
							"@babel/plugin-transform-runtime",
							[
								"@emotion/babel-plugin",
								{
									sourceMap: true,
									autoLabel: "dev-only",
									labelFormat: "[local]",
									cssPropOptimization: true,
								},
							],
						],
					},
				},
			],
		});
		config.resolve.alias = {
			...config.resolve.alias,
			"@emotion/core": toPath("node_modules/@emotion/react"),
			"@emotion/styled": toPath("node_modules/@emotion/styled"),
			"emotion-theming": toPath("node_modules/@emotion/react"),
			"@": toPath("src"),
		};
		return config;
	},
};
