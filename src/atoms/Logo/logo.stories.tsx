import Logo from "./";

function Template() {
	return <Logo />;
}
export const Center = Template.bind({});

Center.args = {};

Center.parameters = {};

const story = {
	title: "Atoms / Logo",
	component: Logo,
};

export default story;
