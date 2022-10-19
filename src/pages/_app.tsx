import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation, SSRConfig } from "next-i18next";
import { AppProps as NextAppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useMemo } from "react";

import { cache } from "@/ions/configs/emotion";
import useDarkMode from "@/ions/hooks/dark-mode";
import useInstallPrompt from "@/ions/hooks/install-prompt";
import StoreProvider from "@/ions/store/context";
import { dark, light } from "@/ions/theme";

const InstallPrompt = dynamic(async () => import("@/organisms/install-prompt"));

// Remove React warning about useLayoutEffect
// Be careful when using this hook.
// We use it to prevent flickering when the theme is adjusted to the user preferences
if (typeof window === "undefined") {
	React.useLayoutEffect = () => {
		/**/
	};
}
type AppProps = NextAppProps<{ session: Session | null } & SSRConfig>;

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const darkMode = useDarkMode(true);
	const theme = useMemo(() => (darkMode ? dark : light), [darkMode]);
	const showInstallPrompt = useInstallPrompt();
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="theme-color" content={theme.palette.primary.main} />
			</Head>
			<EmotionCacheProvider value={cache}>
				<MuiThemeProvider theme={theme}>
					<SessionProvider session={session}>
						<StoreProvider>
							<CssBaseline />
							<Component {...pageProps} />
						</StoreProvider>
					</SessionProvider>
					{showInstallPrompt && <InstallPrompt />}
				</MuiThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation<AppProps>(App);
