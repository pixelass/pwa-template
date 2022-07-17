const { defaults } = require("jest-config");

module.exports = {
	...defaults,
	resolver: `${__dirname}/jest-resolver.js`,
	moduleNameMapper: {
		"^@/(.*)": "<rootDir>/src/$1",
		"^~(.*)": "<rootDir>/$1",
	},
};
