import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import CenterBox from "@/molecules/box/center";

export default function Template() {
	const { t } = useTranslation(["common", "auth"]);
	const { query } = useRouter();
	return (
		<CenterBox>
			<Stack spacing={2} sx={{ maxWidth: 600 }}>
				<Typography variant="h3" component="h1">
					{t(`auth:error.errors.${query.error}`)}
				</Typography>
			</Stack>
		</CenterBox>
	);
}
