import Box from "@mui/material/Box";

import Layout from "./";

import { LayoutProps } from "@/organisms/layout/types";

export default function LayoutWide({ children, ...props }: LayoutProps) {
	return (
		<Layout {...props}>
			<Box
				sx={{
					mx: {
						xs: 1,
						md: 4,
					},
				}}
			>
				{children}
			</Box>
		</Layout>
	);
}
