import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReactNode } from "react";

export default function Main({
	children,
	drawerWidth,
}: {
	children: ReactNode;
	drawerWidth: number;
}) {
	return (
		<Box
			component="main"
			sx={{
				ml: { xs: 0, md: `${drawerWidth}px` },
				py: 4,
				px: 2,
			}}
		>
			<Container>{children}</Container>
		</Box>
	);
}
