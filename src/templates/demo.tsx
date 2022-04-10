import { useStore } from "@/ions/store";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import React from "react";

export default function Template() {
	const { t } = useTranslation(["common"]);
	const count = useStore(state => state.count);
	return (
		<>
			<Button
				variant="contained"
				data-test-id="button"
				onClick={() => {
					useStore.getState().set({ count: count + 1 });
				}}
			>
				<>{t("common:up")}</>
			</Button>
			<div data-test-id="count">{count}</div>
		</>
	);
}
