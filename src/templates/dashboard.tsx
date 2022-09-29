import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";

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
export default function Template({ data: { images } }: { data: { images: ImageType[] } }) {
	const { t } = useTranslation(["menu"]);

	return (
		<Layout title="Dashboard">
			<Typography variant="h2" mb={4}>
				{t("menu:dashboard")}
			</Typography>
			<Grid>
				{images.map(({ id, base64, label, src, text }) => (
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
