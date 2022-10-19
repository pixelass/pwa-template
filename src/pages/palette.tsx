import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { copyText } from "@/ions/utils/clipboard";
import Grid from "@/organisms/grid";
import Column from "@/organisms/grid/column";
import LayoutContained from "@/organisms/layout/contained";

function Layer({ value, parent = null, ignore = [] }) {
	const { t } = useTranslation(["common"]);
	return (
		<Column xs={4}>
			<Typography variant="overline" component="h3">
				{parent}
			</Typography>
			<List>
				{Object.entries(value)
					.filter(([key_]) => !ignore.includes(key_))
					.map(([key_, value_]: [string, string]) => (
						<ListItem
							key={key_}
							sx={theme => ({
								bgcolor: value_,
								color: theme.palette.getContrastText(value_),
							})}
							secondaryAction={
								<IconButton
									aria-label={t("common:copy")}
									sx={{ color: "inherit" }}
									onClick={() => {
										void copyText(value_);
									}}
								>
									<ContentCopyIcon />
								</IconButton>
							}
						>
							<ListItemText>
								{key_
									.replace(/([A-Z])/g, (_, $1) => ` ${$1}`)
									.replace(/^([a-z])/, (_, $1) => $1.toUpperCase())}
							</ListItemText>
						</ListItem>
					))}
			</List>
		</Column>
	);
}

export default function Page() {
	const theme = useTheme();
	return (
		<LayoutContained>
			<Typography variant="h2">Palette</Typography>
			<Grid>
				<Layer value={theme.palette.primary} parent="Primary" />
				<Layer value={theme.palette.secondary} parent="Secondary" />
				<Layer value={theme.palette.error} parent="Error" />
				<Layer value={theme.palette.success} parent="Success" />
				<Layer value={theme.palette.info} parent="Info" />
				<Layer value={theme.palette.warning} parent="Warning" />
				<Layer value={theme.palette.background} parent="Background" />
				<Layer value={theme.palette.common} parent="Common" />
				<Layer
					value={theme.palette.text}
					parent="Text"
					ignore={["primaryChannel", "secondaryChannel"]}
				/>
				<Layer value={theme.palette.grey} parent="Grey" />
			</Grid>
		</LayoutContained>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	return session
		? {
				props: {
					session,
					...(await serverSideTranslations(context.locale, ["common", "menu", "meta"])),
				},
		  }
		: {
				redirect: {
					destination: "/auth/sign-in",
					permanent: false,
				},
		  };
};
