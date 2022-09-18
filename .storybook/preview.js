import {
	CacheProvider as EmotionCacheProvider,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import React from "react";
import { initReactI18next } from "react-i18next";

import { cache } from "../src/ions/configs/emotion";
import { fontFaces, globalStyles } from "../src/ions/styles";
import { dark as theme } from "../src/ions/theme";
import i18n from "./i18next";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
	},
};
const session = {
	user: {
		id: 1,
		name: "Alex Morrison",
		email: "alex.morrison@example.com",
		image: "/assets/images/random-user.jpg",
	},
};
export const decorators = [
	Story => (
		<>
			{fontFaces}
			{globalStyles}
			<EmotionCacheProvider value={cache}>
				<EmotionThemeProvider theme={theme}>
					<SessionProvider session={session}>
						<CssBaseline />
						<Story />
					</SessionProvider>
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	),
	Story => {
		i18n.use(initReactI18next).init({
			lng: "en",
			fallbackLng: "en",
			supportedLngs: ["en", "de"],

			// have a common namespace used around the full app
			ns: ["common"],
			defaultNS: "common",

			interpolation: {
				escapeValue: false, // not needed for react!!
			},

			resources: { en: { translations: {} } },
		});

		return <Story />;
	},
];
