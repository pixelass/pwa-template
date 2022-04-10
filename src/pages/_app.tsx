import { cache } from "@/ions/configs/emotion";
import { theme } from "@/ions/configs/theme";
import {
	CacheProvider as EmotionCacheProvider,
	css,
	Global,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";

export const fontFaces = (
	<Global
		styles={css`
			body {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
					sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			}
		`}
	/>
);

export const globalStyles = (
	<Global
		styles={css`
			#__next {
				display: contents;
			}
		`}
	/>
);

function App({ Component, pageProps }) {
	return (
		<>
			{fontFaces}
			{globalStyles}
			<Head>
				<title key="title">pwa-template</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="msapplication-TileColor" content={theme.palette.primary.main} />
				<meta name="theme-color" content={theme.palette.primary.main} />
			</Head>
			<EmotionCacheProvider value={cache}>
				<EmotionThemeProvider theme={theme}>
					<Component {...pageProps} />
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation(App);
