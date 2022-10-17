import Box from "@mui/material/Box";
import { ReactNode } from "react";

export interface MainProps {
	children: ReactNode;
	drawerWidth: number;
}
export default function Main({ children, drawerWidth }: MainProps) {
	return (
		<Box
			component="main"
			sx={theme => ({
				position: "relative",
				flex: 1,
				width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
				[`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
					minHeight: `calc(100vh - ${theme.spacing(7)})`,
				},
				minHeight: {
					xs: `calc(100vh - ${theme.spacing(9)})`,
					sm: `calc(100vh - ${theme.spacing(11)})`,
					md: `calc(100vh - ${theme.spacing(10)})`,
				},
				ml: { xs: 0, md: `${drawerWidth}px` },
				pb: {
					xs: 10,
				},
			})}
		>
			{children}
		</Box>
	);
}
