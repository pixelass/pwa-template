import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";

import { useStore } from "@/ions/store";
import Card from "@/organisms/card";

export default function Template() {
	const { t } = useTranslation(["common"]);
	const count = useStore(state => state.count);
	return (
		<Card>
			<Button
				variant="contained"
				data-test-id="button"
				startIcon={<AddIcon />}
				onClick={() => {
					useStore.getState().set({ count: count + 1 });
				}}
			>
				<>{t("common:up")}</>
			</Button>
			<div data-test-id="count">{count}</div>
		</Card>
	);
}
