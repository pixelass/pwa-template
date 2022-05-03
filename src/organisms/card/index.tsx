import { pxToRem } from "@/ions/utils/unit";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

export default function Card({ children }) {
	return (
		<MuiCard sx={{ maxWidth: pxToRem(480) }}>
			<CardContent>{children}</CardContent>
		</MuiCard>
	);
}
