import Layout from ".";

function Template({ children }) {
	return <Layout>{children}</Layout>;
}

export const Default = Template.bind({});

Default.args = {
	children: "The Layout",
};

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
