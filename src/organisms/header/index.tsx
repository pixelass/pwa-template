import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { useStore } from "@/ions/store";

export default function Header({ title }) {
	const { data: session } = useSession({ required: true });
	const { t } = useTranslation(["common"]);
	const { back } = useRouter();
	const drawerOpen = useStore(state => state.drawerOpen);
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const [avatarElement, setAvatarElement] = useState<null | HTMLElement>(null);
	const { breakpoints } = useTheme();
	const mdUp = useMediaQuery(breakpoints.up("md"));

	const handleCloseUserMenu = () => {
		setAvatarElement(null);
	};

	return (
		<AppBar
			position="sticky"
			sx={theme => ({
				zIndex: { md: theme.zIndex.drawer + 1 },
			})}
		>
			<Toolbar>
				<IconButton
					edge="start"
					aria-label={t("common:back")}
					sx={{
						color: "inherit",
					}}
					onClick={() => {
						void back();
					}}
				>
					<ArrowBackIcon />
				</IconButton>
				<Typography sx={{ flex: 1 }}>{title}</Typography>
				<Box>
					<IconButton
						edge="end"
						onClick={event => {
							setAvatarElement(event.currentTarget);
						}}
						sx={{ p: 0, mr: { xs: 1, md: 0 } }}
					>
						<Avatar>
							<Image
								src={session.user.image}
								alt={session.user.name}
								quality={40}
								layout="fill"
								objectFit="cover"
								objectPosition="center"
							/>
						</Avatar>
					</IconButton>
					<Menu
						keepMounted
						sx={{ mt: { xs: 6, sm: 7 } }}
						open={Boolean(avatarElement)}
						anchorEl={avatarElement}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						onClose={handleCloseUserMenu}
					>
						<MenuItem
							onClick={async () => {
								await signOut();
								handleCloseUserMenu();
							}}
						>
							<Typography textAlign="center">{t("common:signOut")}</Typography>
						</MenuItem>
					</Menu>
				</Box>
				<IconButton
					edge="end"
					aria-label={t("common:open")}
					sx={{
						display: { md: "none" },
						color: "inherit",
					}}
					onClick={() => {
						useStore.getState().set({ drawerOpen: !drawerOpen });
					}}
				>
					{drawerExpanded && mdUp ? <MenuOpenIcon /> : <MenuIcon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
