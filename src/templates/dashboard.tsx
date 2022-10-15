import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { nanoid } from "nanoid";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";

import Grid from "@/organisms/grid";
import Column from "@/organisms/grid/column";
import Layout from "@/organisms/layout";
interface ImageType {
	id: string;
	label: string;
	text: string;
	src: string;
	height: number;
	width: number;
	color: string;
	base64: string;
}
export default function Template({ data }: { data: { images: ImageType[] } }) {
	const { t } = useTranslation(["menu"]);
	const [cards, setCards] = useState(data.images);

	return (
		<Layout
			title="Dashboard"
			onPullActive={() => {
				console.log("onPullActive");
			}}
			onPullEnd={() => {
				console.log("onPullEnd");
				setCards(previousState => [
					...[
						previousState[Math.round(Math.random() * previousState.length)],
						previousState[Math.round(Math.random() * previousState.length)],
						previousState[Math.round(Math.random() * previousState.length)],
					].map(card => ({
						...card,
						label: `Dynamic load ${Math.round(Math.random() * 1000 + 1)
							.toString()
							.padStart(4, "0")}`,
						id: nanoid(),
					})),
					...cards,
				]);
			}}
		>
			<Typography variant="h2" mb={4}>
				{t("menu:dashboard")}
			</Typography>
			<Grid>
				{cards.map(({ id, base64, label, src, text }) => (
					<Column key={id} xs={4}>
						<Card sx={{ width: "100%" }}>
							<CardHeader
								sx={{ ".MuiCardHeader-content": { overflow: "hidden" } }}
								titleTypographyProps={{ noWrap: true, sx: { overflow: "hidden" } }}
								avatar={
									<Avatar>
										<Image
											src={src}
											blurDataURL={base64}
											placeholder="blur"
											layout="fill"
											objectFit="cover"
											objectPosition="center"
											alt={label}
										/>
									</Avatar>
								}
								title={label}
							/>
							<CardMedia sx={{ position: "relative", height: 300 }}>
								<Image
									src={src}
									blurDataURL={base64}
									placeholder="blur"
									layout="fill"
									objectFit="cover"
									objectPosition="center"
									alt={label}
								/>
							</CardMedia>
							<CardContent>
								<Typography>{text}</Typography>
							</CardContent>
						</Card>
					</Column>
				))}
			</Grid>
		</Layout>
	);
}
