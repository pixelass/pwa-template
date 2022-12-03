import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Basic } from "unsplash-js/src/methods/photos/types";

import Masonry from "@/organisms/grid/masonry";
import LayoutWide from "@/organisms/layout/wide";

export interface Props {
	data: { images: Basic[] };
	isLoading?: boolean;
}

export default function Template({ data }: Props) {
	const { t } = useTranslation(["common", "menu"]);

	return (
		<LayoutWide
			fab={
				<Fab
					color="primary"
					aria-label={t("common:add")}
					onClick={() => {
						console.log("Add item");
					}}
				>
					<AddIcon />
				</Fab>
			}
			onPullActive={() => {
				console.log("onPullActive");
			}}
			onPullEnd={() => {
				console.log("onPullEnd");
			}}
		>
			<Typography variant="h2" mb={4}>
				{t("menu:dashboard")}
			</Typography>
			<Masonry>
				{data?.images?.map(image => (
					<Card
						key={image.id}
						sx={theme => ({
							bgcolor: image.color,
							color: theme.palette.getContrastText(image.color),
						})}
					>
						<CardMedia
							component="figure"
							sx={{ position: "relative", height: image.height / 10, m: 0 }}
						>
							<Image
								fill
								src={image.urls.small}
								alt={image.alt_description ?? ""}
								style={{
									objectFit: "cover",
									objectPosition: "center",
								}}
							/>
						</CardMedia>
						<CardHeader
							sx={{ ".MuiCardHeader-content": { overflow: "hidden" } }}
							titleTypographyProps={{ noWrap: true, sx: { overflow: "hidden" } }}
							avatar={
								<Avatar>
									<Image
										fill
										src={image.user.profile_image.small}
										alt={image.user.username}
										sizes="80px"
										style={{
											objectFit: "cover",
											objectPosition: "center",
										}}
									/>
								</Avatar>
							}
							title={[image.user.first_name, image.user.last_name].join(" ")}
							subheaderTypographyProps={{
								sx: { color: "inherit" },
							}}
							subheader={
								<MuiLink
									href={image.user.links.html}
									rel="noreferrer,nofollow"
									target="_blank"
									sx={{
										color: "inherit",
										textDecorationColor: "currentColor",
									}}
								>
									@{image.user.username}
								</MuiLink>
							}
						/>
						<CardContent>
							<Stack direction="row" spacing={1}>
								<FavoriteIcon />
								<Typography>{image.likes}</Typography>
							</Stack>
						</CardContent>
					</Card>
				))}
			</Masonry>
		</LayoutWide>
	);
}
