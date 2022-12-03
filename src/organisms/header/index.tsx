import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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

import Logo from "@/atoms/Logo";
import { useStore } from "@/ions/store";

export default function Header() {
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
						mr: 1,
					}}
					onClick={() => {
						void back();
					}}
				>
					<ArrowBackIcon />
				</IconButton>
				<Box sx={{ flex: 1 }}>
					<Container sx={{ display: "flex", justifyContent: "center" }}>
						<Logo />
					</Container>
				</Box>
				<Box>
					<IconButton
						edge="end"
						data-cy="user-menu:button"
						onClick={event => {
							setAvatarElement(event.currentTarget);
						}}
						sx={{ p: 0, display: { xs: "none", md: "flex" } }}
					>
						<Avatar>
							<Image
								fill
								src={session.user.image}
								alt={session.user.name}
								quality={40}
								sizes="80px"
								style={{
									objectFit: "cover",
									objectPosition: "center",
								}}
							/>
						</Avatar>
					</IconButton>
					<Menu
						keepMounted
						data-cy="user-menu:menu"
						open={Boolean(avatarElement)}
						anchorEl={avatarElement}
						sx={{ mt: { xs: 6, sm: 7 } }}
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
							component="button"
							data-cy="user-menu:signOut"
							onClick={async () => {
								void signOut();
							}}
						>
							<Typography textAlign="center">{t("common:signOut")}</Typography>
						</MenuItem>
					</Menu>
				</Box>
				<IconButton
					edge="end"
					data-cy="sidebar:header.toggle"
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
