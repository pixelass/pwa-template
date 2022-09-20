import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import CenterBox from "@/molecules/box/center";

export default function Template() {
	const { t } = useTranslation(["common", "auth"]);
	return (
		<CenterBox>
			<Stack spacing={2} sx={{ maxWidth: 600 }}>
				<Typography variant="h3" component="h1">
					{t(`auth:verifyRequest.headline`)}
				</Typography>
			</Stack>
		</CenterBox>
	);
}
