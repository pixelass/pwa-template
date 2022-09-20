import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation, SSRConfig, useTranslation } from "next-i18next";
import { AppProps as NextAppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useMemo } from "react";

import { cache } from "@/ions/configs/emotion";
import useDarkMode from "@/ions/hooks/dark-mode";
import useInstallPrompt from "@/ions/hooks/install-prompt";
import { useStore } from "@/ions/store";
import { dark, light } from "@/ions/theme";
import { setOpacity } from "@/ions/utils/color";

const Snackbar = dynamic(async () => import("@mui/material/Snackbar"));

// Remove React warning about useLayoutEffect
// Be careful when using this hook.
// We use it to prevent flickering when the theme is adjusted to the user preferences
if (typeof window === "undefined") {
	React.useLayoutEffect = () => {
		/**/
	};
}
type AppProps = NextAppProps<{ session: Session | null } & SSRConfig>;

function InstallPrompt() {
	const showInstallPrompt = useInstallPrompt();
	const installPromptOpen = useStore(state => state.installPromptOpen);
	const set = useStore(state => state.set);
	const { t } = useTranslation(["common"]);

	return (
		showInstallPrompt && (
			<Snackbar
				open={installPromptOpen}
				onClose={() => {
					set({ installPromptOpen: false });
				}}
				autoHideDuration={6000}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				sx={theme => ({
					maxWidth: theme.breakpoints.values.sm,
					width: `calc(100% - ${theme.spacing(2)})`,
				})}
			>
				<Card
					sx={{
						width: "100%",
						bgcolor: theme => setOpacity(theme.palette.background.paper, 0.8),
						backdropFilter: "blur(4px) contrast(0.5)",
					}}
				>
					<CardContent>
						<Stack direction="row" alignItems="center" justifyContent="center">
							<Typography sx={{ display: "inline-block" }}>
								Press the Share Icon
							</Typography>
							<IosShareIcon aria-hidden="true" sx={{ ml: 2, color: "info.main" }} />
						</Stack>
						<Typography my={2}>Then press:</Typography>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography sx={{ display: "inline-block" }}>
								Add to Home Screen
							</Typography>
							<AddBoxOutlinedIcon aria-hidden="true" />
						</Stack>
					</CardContent>
					<CardActions>
						<Button
							onClick={() => {
								set({ installPromptOpen: false });
							}}
						>
							{t("common:close")}
						</Button>
					</CardActions>
				</Card>
			</Snackbar>
		)
	);
}

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const darkMode = useDarkMode(true);
	const theme = useMemo(() => (darkMode ? dark : light), [darkMode]);

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="theme-color" content={theme.palette.primary.main} />
			</Head>
			<EmotionCacheProvider value={cache}>
				<MuiThemeProvider theme={theme}>
					<SessionProvider session={session}>
						<CssBaseline />
						<Component {...pageProps} />
					</SessionProvider>
					<InstallPrompt />
				</MuiThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation<AppProps>(App);
