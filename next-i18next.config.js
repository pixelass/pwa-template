const path = require("path");

module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "de"],
	},
	localeDetection: true,
	localePath: path.resolve("./public/static/locales"),
};
