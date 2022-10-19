import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CenterBox from "./center";

function Template({ children }) {
	return (
		<CenterBox>
			<Box
				sx={{
					p: 2,
					height: "100%",
					bgcolor: "secondary.main",
					color: "secondary.contrastText",
					borderRadius: 1,
				}}
			>
				<Typography variant="overline">{children}</Typography>
			</Box>
		</CenterBox>
	);
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
