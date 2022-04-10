import { useStore } from "@/ions/store";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import React from "react";

export default function Template() {
	const { t } = useTranslation(["common"]);
	const bool = useStore(state => state.bool);
	return (
		<Button
			color={bool ? "primary" : "secondary"}
			variant="contained"
			onClick={() => {
				useStore.getState().set({ bool: !bool });
			}}
		>
			<>
				{t("common:toggle")} {bool ? t("common:off") : t("common:on")}
			</>
		</Button>
	);
}
