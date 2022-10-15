import InstallPrompt from ".";

function Template({ open }) {
	return <InstallPrompt open={open} />;
}
export const Default = Template.bind({});

Default.args = {
	open: true,
};

Default.parameters = {};

const story = {
	title: "Organisms / InstallPrompt",
	component: InstallPrompt,
};

export default story;
