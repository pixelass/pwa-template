import Box from "@mui/material/Box";
import { ReactNode } from "react";

export default function CenterBox({ children }: { children?: ReactNode }) {
	return (
		<Box
			sx={theme => ({
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: `calc(100% - ${theme.spacing(4)})`,
				maxWidth: 400,
			})}
		>
			{children}
		</Box>
	);
}
