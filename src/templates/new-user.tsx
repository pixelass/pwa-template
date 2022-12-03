import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

import CenterBox from "@/molecules/box/center";

export default function Template() {
	const { t } = useTranslation(["common", "auth"]);
	return (
		<CenterBox>
			<Stack spacing={2} sx={{ maxWidth: 600 }}>
				<Typography variant="h3" component="h1">
					{t(`auth:newUser.headline`)}
				</Typography>
				<Typography>{t(`auth:newUser.body`)}</Typography>
				<NextLink legacyBehavior passHref href="/dashboard" shallow={false}>
					<Button component="a">{t("common:ok")}</Button>
				</NextLink>
			</Stack>
		</CenterBox>
	);
}
