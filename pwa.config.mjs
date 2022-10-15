import pkg from "./package.json" assert { type: "json" };

const config = {
	key: "pwa-template",
	version: pkg.version,
	path: "/pwa/",
	appName: "PWA Template",
	appShortName: "PWA",
	appTitle: "PWA template",
	appDescription: "PWA template with Next.js and MUI",
	developerName: "Gregor Adams",
	developerURL: "https://github.com/pixelass",
	dir: "auto",
	lang: "en",
	background: "#121212",
	theme_color: "#0097A7",
	appleStatusBarStyle: "black",
	display: "standalone",
	orientation: "portrait",
	scope: "/",
	start_url: "/",
	pixel_art: false,
	loadManifestWithCredentials: false,
	manifestMaskable: true,
	preferRelatedApplications: false,
	relatedApplications: undefined,
	icons: {
		// Platform Options:
		// - offset - offset in percentage
		// - background:
		//   * false - use default
		//   * true - force use default, e.g. set background for Android icons
		//   * color - set background for the specified icons
		//
		android: true,
		appleIcon: true,
		appleStartup: true,
		favicons: true,
		windows: false,
		yandex: false,
	},
	shortcuts: [],
};

export default config;
