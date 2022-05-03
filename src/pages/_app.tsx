import { cache } from "@/ions/configs/emotion";
import { fontFaces, globalStyles } from "@/ions/styles";
import { dark, light } from "@/ions/theme";
import {
	CacheProvider as EmotionCacheProvider,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React, { useMemo } from "react";
import useDarkMode from "@/ions/hooks/dark-mode";

function App({ Component, pageProps }) {
	const mode = useDarkMode();
	const theme = useMemo(() => (mode ? dark : light), [mode]);

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
					<CssBaseline />
					<Component {...pageProps} />
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation(App);
