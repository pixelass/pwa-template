import Header from ".";

function Template() {
	return <Header />;
}

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

const story = {
	title: "Organisms / Header",
	component: Header,
};

export default story;
