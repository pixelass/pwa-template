import CenterBox from "./center";

function Template({ children }) {
	return <CenterBox>{children}</CenterBox>;
}
export const Center = Template.bind({});

Center.args = {
	children: "CenterBox",
};

Center.parameters = {};

const story = {
	title: "Molecules / CenterBox",
	component: CenterBox,
};

export default story;
