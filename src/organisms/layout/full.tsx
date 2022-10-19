import Box from "@mui/material/Box";

import Layout from "./";

import { LayoutProps } from "@/organisms/layout/types";

export default function LayoutFull({ children, ...props }: LayoutProps) {
	return (
		<Layout {...props}>
			<Box
				sx={theme => ({
					position: "absolute",
					inset: 0,
					mx: 1,
					mb: {
						xs: 9,
						md: 1,
					},
					[`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
						mb: 10,
					},
					overflow: "auto",
				})}
			>
				{children}
			</Box>
		</Layout>
	);
}
