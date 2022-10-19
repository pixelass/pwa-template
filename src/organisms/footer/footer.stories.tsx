import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import Footer from ".";

function Template() {
	return <Footer />;
}

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

function TemplateFab() {
	return (
		<Footer
			fab={
				<Fab>
					<AddIcon />
				</Fab>
			}
		/>
	);
}

export const WithFab = TemplateFab.bind({});

WithFab.args = {};

WithFab.parameters = {};

const story = {
	title: "Organisms / Footer",
	component: Footer,
};

export default story;
