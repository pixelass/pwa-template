import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "./constants";
import { LayoutProps } from "./types";

import { useStore } from "@/ions/store";
import PullToRefresh from "@/molecules/pull-to-load";
import Drawer from "@/organisms/drawer";
import Footer from "@/organisms/footer";
import Header from "@/organisms/header";
import Main from "@/organisms/main";

export default function Layout({ children, onPullActive, onPullEnd, fab }: LayoutProps) {
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const drawerWidth = drawerExpanded ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;

	return (
		<>
			<PullToRefresh color="primary.contrastText" onEnd={onPullEnd} onActive={onPullActive} />
			<Header />
			<Drawer drawerWidth={drawerWidth} />
			<Main drawerWidth={drawerWidth}>{children}</Main>
			<Footer fab={fab} />
		</>
	);
}
