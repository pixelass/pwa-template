import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

import CenterBox from "@/molecules/box/center";

export default function Template() {
	const { t } = useTranslation(["common", "form", "errors", "auth"]);
	return (
		<CenterBox>
			<Stack spacing={2} sx={{ maxWidth: 400 }}>
				<Typography variant="h3" component="h1">
					{t("auth:signOut.headline")}
				</Typography>
				<Button
					type="button"
					variant="contained"
					size="large"
					onClick={() => {
						void signOut();
					}}
				>
					{t("common:signOut")}
				</Button>
			</Stack>
		</CenterBox>
	);
}
