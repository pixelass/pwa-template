import Card from ".";

function Template({ children }) {
	return <Card>{children}</Card>;
}

export const Default = Template.bind({});

Default.args = {
	children: "Hello Card",
};

const story = {
	title: "Card",
	component: Card,
};

export default story;
