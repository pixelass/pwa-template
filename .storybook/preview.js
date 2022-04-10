import {
	CacheProvider as EmotionCacheProvider,
	css,
	Global,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import React from "react";
import { cache } from "../src/ions/configs/emotion";
import { fontFaces, globalStyles } from "../src/ions/styles";
import { theme } from "../src/ions/theme";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	Story => (
		<>
			{fontFaces}
			{globalStyles}
			<EmotionCacheProvider value={cache}>
				<EmotionThemeProvider theme={theme}>
					<CssBaseline />
					<Story />
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	),
];
