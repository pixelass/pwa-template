import Container from "@mui/material/Container";

import Layout from "./";

import { LayoutProps } from "@/organisms/layout/types";

export default function LayoutContained({ children, ...props }: LayoutProps) {
	return (
		<Layout {...props}>
			<Container
				sx={{
					px: {
						xs: 1,
						sm: 2,
						md: 4,
					},
				}}
			>
				{children}
			</Container>
		</Layout>
	);
}
