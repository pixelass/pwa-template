import Drawer from ".";

import { useStore } from "@/ions/store";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "@/organisms/layout/constants";

function Template() {
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const drawerWidth = drawerExpanded ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;
	return <Drawer drawerWidth={drawerWidth} />;
}

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

const story = {
	title: "Organisms / Drawer",
	component: Drawer,
};

export default story;
