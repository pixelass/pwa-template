const { defaults } = require("jest-config");

module.exports = {
	...defaults,
	moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
	moduleNameMapper: {
		"^@/(.*)": "<rootDir>/src/$1",
		"^~(.*)": "<rootDir>/$1",
	},
};
