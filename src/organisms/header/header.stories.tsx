import Header from ".";

function Template({ title }) {
	return <Header title={title} />;
}

export const Default = Template.bind({});

Default.args = {
	title: "Header",
};

Default.parameters = {};

const story = {
	title: "Organisms / Header",
	component: Header,
};

export default story;
