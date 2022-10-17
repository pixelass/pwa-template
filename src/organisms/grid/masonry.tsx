import MuiMasonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";

import { MasonryProps } from "./types";

export default function Masonry({ children, ...props }: MasonryProps) {
	return (
		<Box sx={{ mx: -1 }}>
			<MuiMasonry
				{...props}
				spacing={2}
				columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
				sx={{ m: 0 }}
			>
				{children}
			</MuiMasonry>
		</Box>
	);
}
