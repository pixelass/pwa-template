/**
 * {@see https://eslint.org/docs/user-guide/configuring/rules}
 */
module.exports = {
	extends: ["xo-react", "prettier"],
	ignores: ["public", "*.config.js", "next-env.d.ts", "types/*.d.ts", "cypress"],
	plugins: ["prettier"],
	env: ["browser", "node"],
	overrides: [
		{
			files: "**/*.{ts,tsx}",
			rules: {
				"@typescript-eslint/consistent-type-assertions": [
					1,
					{
						assertionStyle: "as",
						objectLiteralTypeAssertions: "allow-as-parameter",
					},
				],
				"react/prop-types": 0,
				"react/display-name": 0,
				"import/extensions": [
					1,
					{
						js: "never",
						jsx: "never",
						ts: "never",
						tsx: "never",
						css: "always",
						json: "always",
					},
				],
			},
		},
	],
	prettier: true,
	rules: {
		"unicorn/prefer-node-protocol": 0,
		"import/order": 0,
		"node/file-extension-in-import": 0,
	},
};
