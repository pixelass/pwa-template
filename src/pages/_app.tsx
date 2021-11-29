import { cache } from "@/ions/configs/emotion";
import { dark, light } from "@/ions/configs/theme";
import {
	CacheProvider as EmotionCacheProvider,
	css,
	Global,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import grey from "@mui/material/colors/grey";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";
import pkg from "../../package.json";

export const fontFaces = css`
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
			sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
`;

export const globalStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	html {
		font-size: 16px;
	}
	body {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 320px;
		max-width: 100vw;
		min-height: 100vh;
		margin: 0;
		background-color: ${grey[900]};
		&.dark-mode {
			/* dark mode */
			-webkit-font-smoothing: antialiased;
		}
		&.light-mode {
			/* light mode */
			background-color: ${grey[200]};
		}
	}
	#__next {
		display: contents;
	}
	a {
		color: currentColor;
	}
`;

const App = ({ Component, pageProps }) => {
	const { value: darkMode } = useDarkMode(true);
	const [theme, setTheme] = useState(dark);

	useEffect(() => {
		setTheme(darkMode ? dark : light);
	}, [darkMode]);

	return (
		<>
			<Global styles={fontFaces} />
			<Global styles={globalStyles} />
			<Head>
				<title key="title">pwa-template</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="version" content={pkg.version} />
				<meta name="application-name" content="pwa-template" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-title" content="pwa-template" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="robots" content="noindex,nofollow" />
				{/* Enable when needed
				<meta name="msapplication-TileColor" content={theme.ui.colors.theme.background}/>
				*/}
				<meta name="msapplication-tap-highlight" content="no" />
				{/* Enable when needed
				<meta name="theme-color" content={theme.ui.colors.theme.background} />
				*/}
				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<EmotionCacheProvider value={cache}>
				<EmotionThemeProvider theme={theme}>
					<Component {...pageProps} />
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	);
};

export default appWithTranslation(App);
