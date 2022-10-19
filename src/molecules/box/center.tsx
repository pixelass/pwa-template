import Box from "@mui/material/Box";
import { ReactNode } from "react";

export interface CenterBoxProps {
	children?: ReactNode;
	width?: number | string;
	height?: number | string;
	maxWidth?: number | string;
	maxHeight?: number | string;
}

export default function CenterBox({
	children,
	width,
	height,
	maxWidth = 400,
	maxHeight = 400,
}: CenterBoxProps) {
	return (
		<Box
			sx={theme => ({
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: width ?? `calc(100% - ${theme.spacing(4)})`,
				height: height ?? `calc(100% - ${theme.spacing(4)})`,
				maxWidth,
				maxHeight,
			})}
		>
			{children}
		</Box>
	);
}
