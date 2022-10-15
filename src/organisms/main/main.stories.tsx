import Main from ".";

import { useStore } from "@/ions/store";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI } from "@/organisms/layout/constants";

function Template({ children }) {
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const drawerWidth = drawerExpanded ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;
	return <Main drawerWidth={drawerWidth}>{children}</Main>;
}
export const Default = Template.bind({});

Default.args = {
	children: "Main",
};

Default.parameters = {};

const story = {
	title: "Organisms / Main",
	component: Main,
};

export default story;
