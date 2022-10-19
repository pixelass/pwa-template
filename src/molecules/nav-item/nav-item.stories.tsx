import NavItem from "./";

function Template() {
	return <NavItem href="/dashboard">Dashboard</NavItem>;
}
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

const story = {
	title: "Molecules / NavItem",
	component: NavItem,
};

export default story;
