import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import useInstallPrompt from "@/ions/hooks/install-prompt";
import { useStore } from "@/ions/store";
import { setOpacity } from "@/ions/utils/color";

export default function InstallPrompt() {
	const showInstallPrompt = useInstallPrompt();
	const installPromptOpen = useStore(state => state.installPromptOpen);
	const { t } = useTranslation(["common"]);

	return (
		showInstallPrompt && (
			<Snackbar
				open={installPromptOpen}
				onClose={() => {
					useStore.getState().set({ installPromptOpen: false });
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				sx={theme => ({
					maxWidth: theme.breakpoints.values.sm,
					width: `calc(100% - ${theme.spacing(2)})`,
				})}
			>
				<Card
					sx={{
						width: "100%",
						bgcolor: theme => setOpacity(theme.palette.background.paper, 0.8),
						backdropFilter: "blur(4px) contrast(0.5)",
					}}
				>
					<CardContent>
						<Stack direction="row" alignItems="center" justifyContent="center">
							<Typography sx={{ display: "inline-block" }}>
								Press the Share Icon
							</Typography>
							<IosShareIcon aria-hidden="true" sx={{ ml: 2, color: "info.main" }} />
						</Stack>
						<Typography my={2}>Then press:</Typography>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography sx={{ display: "inline-block" }}>
								Add to Home Screen
							</Typography>
							<AddBoxOutlinedIcon aria-hidden="true" />
						</Stack>
					</CardContent>
					<CardActions>
						<Button
							onClick={() => {
								useStore.getState().set({ installPromptOpen: false });
							}}
						>
							{t("common:close")}
						</Button>
					</CardActions>
				</Card>
			</Snackbar>
		)
	);
}
