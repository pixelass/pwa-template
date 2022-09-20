import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useMemo, useState } from "react";

import { DRAWER_WIDTH } from "./constants";
import { WrapperProps } from "./types";

import { useStore } from "@/ions/store";

export function Header({ title }) {
	const { data: session } = useSession({ required: true });
	const { t } = useTranslation(["common"]);
	const drawerOpen = useStore(state => state.drawerOpen);
	const set = useStore(state => state.set);
	const [avatarElement, setAvatarElement] = useState<null | HTMLElement>(null);

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
					aria-label={t("common:open")}
					edge="start"
					sx={{
						mr: 2,
						color: "inherit",
					}}
					onClick={() => {
						set({ drawerOpen: !drawerOpen });
					}}
				>
					{drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
				</IconButton>
				<Typography sx={{ flex: 1 }}>{title}</Typography>
				<Box>
					<IconButton
						edge="end"
						onClick={event => {
							setAvatarElement(event.currentTarget);
						}}
						sx={{ p: 0 }}
					>
						<Avatar>
							<Image
								src={session.user.image}
								alt={session.user.name}
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
			</Toolbar>
		</AppBar>
	);
}

export function DrawerContent({ withTooltips }: { withTooltips?: boolean }) {
	const { t } = useTranslation(["menu"]);
	const { asPath } = useRouter();
	const Wrapper = useMemo(
		() =>
			withTooltips
				? ({ children, title }: WrapperProps) => (
						<Tooltip disableInteractive title={title} placement="right">
							{children}
						</Tooltip>
				  )
				: ({ children }: WrapperProps) => <Fragment>{children}</Fragment>,
		[withTooltips]
	);

	return (
		<Box>
			<Toolbar />
			<List component="nav" sx={{ width: "100%" }}>
				<NextLink passHref href="/profile" shallow={false}>
					<ListItemButton
						component="a"
						selected={asPath === "/profile"}
						sx={{ color: "text.primary", textDecoration: "none" }}
					>
						<Wrapper title={t("menu:profile")}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
						</Wrapper>
						<ListItemText primary={t("menu:profile")} />
					</ListItemButton>
				</NextLink>
				<NextLink passHref href="/dashboard" shallow={false}>
					<ListItemButton
						component="a"
						selected={asPath === "/dashboard"}
						sx={{ color: "text.primary", textDecoration: "none" }}
					>
						<Wrapper title={t("menu:dashboard")}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
						</Wrapper>
						<ListItemText primary={t("menu:dashboard")} />
					</ListItemButton>
				</NextLink>
			</List>
		</Box>
	);
}

export function TemporaryDrawer() {
	const drawerOpen = useStore(state => state.drawerOpen);
	const set = useStore(state => state.set);
	const { t } = useTranslation(["common", "menu"]);
	const { breakpoints } = useTheme();
	const mdUp = useMediaQuery(breakpoints.up("md"));
	return (
		<SwipeableDrawer
			disableScrollLock={mdUp}
			open={drawerOpen}
			ModalProps={{
				keepMounted: true,
			}}
			sx={{ display: { xs: "block", md: "none" }, width: DRAWER_WIDTH }}
			PaperProps={{ sx: { width: DRAWER_WIDTH } }}
			onClose={() => {
				set({ drawerOpen: false });
			}}
			onOpen={() => {
				set({ drawerOpen: true });
			}}
		>
			<AppBar color="transparent" position="absolute">
				<Toolbar>
					<Box flex={1} />
					<IconButton
						edge="end"
						aria-label={t("common:close")}
						sx={{ color: "inherit" }}
						onClick={() => {
							set({ drawerOpen: false });
						}}
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DrawerContent />
		</SwipeableDrawer>
	);
}

export function PermanentDrawer({ drawerWidth }) {
	const drawerOpen = useStore(state => state.drawerOpen);
	return (
		<Drawer
			open
			variant="persistent"
			PaperProps={{
				sx: {
					width: drawerWidth,
				},
			}}
			className={clsx({
				["MuiDrawer-collapsed"]: !drawerOpen,
			})}
			sx={{
				display: {
					xs: "none",
					md: "block",
				},
				width: drawerWidth,
			}}
		>
			<DrawerContent withTooltips={!drawerOpen} />
		</Drawer>
	);
}

export function Main({ children, drawerWidth }) {
	return (
		<Box
			component="main"
			sx={{
				ml: { xs: 0, md: `${drawerWidth}px` },
				py: 4,
				px: 2,
			}}
		>
			<Container>{children}</Container>
		</Box>
	);
}
