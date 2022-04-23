import { pxToRem } from "@/ions/utils/unit";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

export default function Card({ children }) {
	return (
		<MuiCard sx={{ maxWidth: pxToRem(480) }}>
			<CardContent>
				<Typography>{children}</Typography>
			</CardContent>
		</MuiCard>
	);
}
