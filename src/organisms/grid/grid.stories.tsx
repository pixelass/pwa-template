import Box from "@mui/material/Box";

import Column from "./column";

import Grid from "./";

function Template() {
	return (
		<Box sx={{ m: 2 }}>
			<Grid>
				<Column xs={4}>
					<Box sx={{ height: 200, bgcolor: "secondary.main", borderRadius: 1 }} />
				</Column>
				<Column xs={4} md={8}>
					<Box sx={{ height: 200, bgcolor: "primary.main", borderRadius: 1 }} />
				</Column>
				<Column xs={4} lg={3}>
					<Box sx={{ height: 200, bgcolor: "secondary.main", borderRadius: 1 }} />
				</Column>
				<Column xs={4} lg={6}>
					<Box sx={{ height: 200, bgcolor: "primary.main", borderRadius: 1 }} />
				</Column>
				<Column xs={4}>
					<Box sx={{ height: 200, bgcolor: "secondary.main", borderRadius: 1 }} />
				</Column>
			</Grid>
		</Box>
	);
}

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

const story = {
	title: "Organisms / Grid",
	component: Grid,
};

export default story;
