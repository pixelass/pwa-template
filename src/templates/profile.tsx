import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import Grid from "@/organisms/grid";
import Column from "@/organisms/grid/column";
import LayoutContained from "@/organisms/layout/contained";

export default function Template() {
	const { t } = useTranslation(["menu"]);
	const { data: session } = useSession();
	return (
		<LayoutContained>
			<Typography variant="h2" mb={4}>
				{t("menu:profile")}
			</Typography>
			<Grid>
				<Column xs={4}>
					<Card>
						<CardHeader
							avatar={
								<Avatar>
									<Image
										fill
										src={session.user.image}
										alt={session.user.name}
										style={{
											objectFit: "cover",
											objectPosition: "center",
										}}
									/>
								</Avatar>
							}
							title={session.user.name}
							subheader={session.user.email}
						/>
					</Card>
				</Column>
			</Grid>
		</LayoutContained>
	);
}
