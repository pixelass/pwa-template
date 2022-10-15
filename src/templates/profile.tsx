import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import Grid from "@/organisms/grid";
import Column from "@/organisms/grid/column";
import Layout from "@/organisms/layout";

export default function Template() {
	const { t } = useTranslation(["menu"]);
	const { data: session } = useSession();
	return (
		<Layout title="Profile">
			<Typography variant="h2">{t("menu:profile")}</Typography>
			<Grid>
				<Column xs={4}>
					<Card>
						<CardMedia component="img" src={session.user.image} height={304} />
						<CardContent>
							<Typography>{session.user.name}</Typography>
						</CardContent>
					</Card>
				</Column>
			</Grid>
		</Layout>
	);
}
