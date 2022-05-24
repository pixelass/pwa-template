import { cache } from "@/ions/configs/emotion";
import { fontFaces, globalStyles } from "@/ions/styles";
import { dark, darkHighContrast, light, lightHighContrast } from "@/ions/theme";
import {
	CacheProvider as EmotionCacheProvider,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React, { useMemo } from "react";
import useDarkMode from "@/ions/hooks/dark-mode";
import useIncreasedContrast from "@/ions/hooks/increased-contrast";

// Remove React warning about useLayoutEffect
// Be careful when using this hook.
// We use it to prevent flickering when the theme is adjusted to the user preferences
if (typeof window === "undefined") {
	React.useLayoutEffect = () => {
		/**/
	};
}

function App({ Component, pageProps }) {
	const darkMode = useDarkMode();
	const increasedContrast = useIncreasedContrast();
	const theme = useMemo(
		() =>
			darkMode
				? increasedContrast
					? darkHighContrast
					: dark
				: increasedContrast
				? lightHighContrast
				: light,
		[darkMode, increasedContrast]
	);

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
