import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React, { useMemo } from "react";

import { cache } from "@/ions/configs/emotion";
import useDarkMode from "@/ions/hooks/dark-mode";
import useIncreasedContrast from "@/ions/hooks/increased-contrast";
import { fontFaces, globalStyles } from "@/ions/styles";
import { dark, darkHighContrast, light, lightHighContrast } from "@/ions/theme";

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
	const theme = useMemo(() => {
		if (darkMode) {
			return increasedContrast ? darkHighContrast : dark;
		}

		return increasedContrast ? lightHighContrast : light;
	}, [darkMode, increasedContrast]);

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
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</MuiThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation(App);
