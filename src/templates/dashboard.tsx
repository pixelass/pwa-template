import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Head from "next/head";

import Layout from "@/organisms/layout";

export default function Template() {
	const { t } = useTranslation(["menu"]);

	return (
		<Layout title="Dashboard">
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="Dashboard" />
			</Head>
			<Typography variant="h2" mb={4}>
				{t("menu:dashboard")}
			</Typography>
			<Grid container columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }} spacing={2}>
				{Array.from({ length: 6 }, (_, index) => ({
					id: index + 1,
					label: `Card ${index + 1}`,
					text: "Ubi est festus boreas? Pol, a bene domus, domesticus torquis! Cum solem mori, omnes aususes reperire teres, mirabilis burguses. ",
					color: `hsl(${(360 / 6) * index}, 100%, 80%)`,
				})).map(({ id, color, label, text }) => (
					<Grid item key={id} xs={4}>
						<Card sx={{ width: "100%" }}>
							<CardHeader title={label} />
							<CardMedia>
								<Box
									sx={{
										height: 200,
										bgcolor: color,
										color: "common.black",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Typography variant="caption">{color}</Typography>
								</Box>
							</CardMedia>
							<CardContent>
								<Typography>{text}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}
