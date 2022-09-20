import { CacheProvider as EmotionCacheProvider, Global, css } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import React from "react";

import { cache } from "@/ions/configs/emotion";
import { light as theme } from "@/ions/theme";
import { USER } from "@/mocks/user";
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
	i18n,
	locale: "en",
	locales: {
		en: "English",
		de: "Deutsch",
	},
};

const session: Session = {
	user: USER,
	expires: "2030-01-01T00:00:00.000Z",
};

const storyBookReset = (
	<Global
		styles={css({
			"body.sb-main-padded.sb-show-main": {
				padding: 0,
			},
		})}
	/>
);

export const decorators = [
	Story => (
		<EmotionCacheProvider value={cache}>
			<MuiThemeProvider theme={theme}>
				<SessionProvider session={session}>
					{storyBookReset}
					<CssBaseline />
					<Story />
				</SessionProvider>
			</MuiThemeProvider>
		</EmotionCacheProvider>
	),
];
