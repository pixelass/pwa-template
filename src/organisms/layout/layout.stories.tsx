import Layout from ".";

function Template() {
	return <Layout />;
}

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
	nextRouter: {
		path: "/dashboard",
		asPath: "/dashboard",
	},
};

const story = {
	title: "Organisms / Layout",
	component: Layout,
};

export default story;
