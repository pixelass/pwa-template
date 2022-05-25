/**
 * {@see https://eslint.org/docs/user-guide/configuring/rules}
 */
module.exports = {
	extends: ["xo-react", "prettier"],
	ignores: ["public", "*.d.ts", "cypress"],
	plugins: ["prettier"],
	env: ["browser", "node"],
	overrides: [
		{
			files: "src/**/*.{ts,tsx}",
			rules: {
				"import/extensions": [
					2,
					{
						js: "never",
						jsx: "never",
						ts: "never",
						tsx: "never",
						css: "always",
						json: "always",
						png: "always",
						jpg: "always",
						jpeg: "always",
						svg: "always",
					},
				],
				"react/prop-types": 0,
				"unicorn/prefer-module": 0,
			},
		},
		{
			files: "*.config.js",
			rules: {
				"unicorn/prefer-module": 0,
				"import/extensions": 0,
			},
		},
		{
			files: "*.config.mjs",
			rules: {
				"import/extensions": 0,
				"node/file-extension-in-import": 0,
			},
		},
	],
	prettier: true,
	rules: {
		"import/order": [
			2,
			{
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				"newlines-between": "always",
			},
		],
		"no-nested-ternary": 2,
		"object-curly-spacing": [2, "always"],
	},
};
