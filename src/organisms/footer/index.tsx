import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";

import { navigation } from "@/ions/configs/navigation";
import IconLink from "@/molecules/icon-link";

export interface FooterProps {
	fab?: ReactNode;
}

export default function Footer({ fab }: FooterProps) {
	return (
		<>
			<AppBar
				position="fixed"
				color="default"
				sx={theme => ({
					display: { md: "none" },
					top: "auto",
					bottom: 0,
					zIndex: theme.zIndex.drawer - 1,
				})}
			>
				<Toolbar sx={{ justifyContent: "space-evenly" }}>
					<IconLink link={navigation[0]} />
					<IconLink link={navigation[1]} />
					{fab ? (
						<Box sx={{ transform: "translateY(-50%)" }}>{fab}</Box>
					) : (
						<Fab sx={{ visibility: "hidden" }} />
					)}
					<IconLink link={navigation[2]} />
					<IconLink link={navigation[3]} />
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					display: { xs: "none", md: "flex" },
					position: "fixed",
					right: 0,
					bottom: 0,
					mr: 1,
					mb: 1.5,
				}}
			>
				{fab}
			</Box>
		</>
	);
}
