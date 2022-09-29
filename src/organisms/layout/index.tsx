import { ReactNode, useCallback } from "react";

import { Header, Main, PermanentDrawer, TemporaryDrawer } from "./components";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "./constants";

import { useStore } from "@/ions/store";
import PullToRefresh from "@/molecules/pull-to-load";

export default function Layout({ children, title }: { children?: ReactNode; title?: string }) {
	const drawerOpen = useStore(state => state.drawerOpen);
	const drawerWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;

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
