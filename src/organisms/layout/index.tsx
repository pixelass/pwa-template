import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect } from "react";

import { Header, Main, PermanentDrawer, TemporaryDrawer } from "./components";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "./constants";

import { useStore } from "@/ions/store";
import PullToRefresh from "@/molecules/pull-to-load";

export default function Layout({ children, title }: { children?: ReactNode; title?: string }) {
	const drawerOpen = useStore(state => state.drawerOpen);

	const { asPath } = useRouter();
	const { breakpoints } = useTheme();

	const drawerWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;

	useEffect(() => {
		if (window.innerWidth < breakpoints.values.md) {
			useStore.getState().set({ drawerOpen: false });
		}
	}, [asPath, breakpoints]);

	return (
		<>
			<PullToRefresh
				color="primary.contrastText"
				onEnd={useCallback(() => {
					console.log("reload");
				}, [])}
				onActive={useCallback(() => {
					console.log("active");
				}, [])}
			/>
			<Header title={title} />
			<TemporaryDrawer />
			<PermanentDrawer drawerWidth={drawerWidth} />
			<Main drawerWidth={drawerWidth}>{children}</Main>
		</>
	);
}
