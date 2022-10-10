import { Header, Main, PermanentDrawer, TemporaryDrawer } from "./components";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "./constants";

import { useStore } from "@/ions/store";
import PullToRefresh from "@/molecules/pull-to-load";
import { LayoutProps } from "@/organisms/layout/types";

export default function Layout({ children, title, onPullActive, onPullEnd }: LayoutProps) {
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const drawerWidth = drawerExpanded ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;

	return (
		<>
			<PullToRefresh color="primary.contrastText" onEnd={onPullEnd} onActive={onPullActive} />
			<Header title={title} />
			<TemporaryDrawer />
			<PermanentDrawer drawerWidth={drawerWidth} />
			<Main drawerWidth={drawerWidth}>{children}</Main>
		</>
	);
}
