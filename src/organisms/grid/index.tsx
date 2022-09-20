import MuiGrid from "@mui/material/Grid";

import { GridProps } from "./types";

export default function Grid({ children, ...props }: GridProps) {
	return (
		<MuiGrid {...props} container columns={{ xs: 4, sm: 8, md: 8, lg: 12 }} spacing={2}>
			{children}
		</MuiGrid>
	);
}
