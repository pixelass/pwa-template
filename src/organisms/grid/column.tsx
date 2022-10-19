import Grid from "@mui/material/Unstable_Grid2";

import { GridProps } from "./types";

export default function Column({ children, ...props }: GridProps) {
	return <Grid {...props}>{children}</Grid>;
}
