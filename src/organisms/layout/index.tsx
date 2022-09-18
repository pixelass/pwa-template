import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement, ReactNode, useEffect, useMemo, useState } from "react";

import { useStore } from "@/ions/store";

const DRAWER_WIDTH = 272;
const DRAWER_WIDTH_MINI = 57;

interface WrapperProps {
	children?: ReactElement;
	title: string;
}

function DrawerContent({ tooltips }: { tooltips?: boolean }) {
	const { t } = useTranslation(["menu"]);
	const Wrapper = useMemo(
		() =>
			tooltips
				? ({ children, title }: WrapperProps) => (
						<Tooltip disableInteractive title={title} placement="right">
							{children}
						</Tooltip>
				  )
				: ({ children }: WrapperProps) => <Fragment>{children}</Fragment>,
		[tooltips]
	);

	return (
		<Box sx={{ overflowX: "hidden" }}>
			<Toolbar />
			<List component="nav" sx={{ width: "100%" }}>
				<NextLink passHref href="/dashboard">
					<ListItemButton
						component="a"
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
				<NextLink passHref href="/profile">
					<ListItemButton
						component="a"
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
			</List>
		</Box>
	);
}
export default function Layout({ children, title }: { children?: ReactNode; title?: string }) {
	const { data: session } = useSession({ required: true });
	const drawerOpen = useStore(state => state.drawerOpen);
	const set = useStore(state => state.set);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const { t } = useTranslation(["common", "menu"]);
	const { asPath } = useRouter();
	const { breakpoints } = useTheme();
	const mdUp = useMediaQuery(breakpoints.up("md"));
	const drawerWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_MINI;

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		if (window.innerWidth < breakpoints.values.md) {
			useStore.getState().set({ drawerOpen: false });
		}
	}, [asPath, breakpoints]);

	return (
		<>
			<AppBar
				enableColorOnDark
				sx={{
					zIndex: theme => ({ md: theme.zIndex.drawer + 1 }),
				}}
			>
				<Toolbar>
					<IconButton
						aria-label={t("common:open")}
						edge="start"
						sx={{
							mr: 2,
							color: "primary.contrastText",
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
							onClick={event => {
								setAnchorElUser(event.currentTarget);
							}}
							sx={{ p: 0 }}
						>
							<Avatar src={session.user.image} alt={session.user.name} />
						</IconButton>
						<Menu
							sx={{ mt: { xs: 6, sm: 7 } }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								onClick={async () => {
									await signOut();
									handleCloseUserMenu();
								}}
							>
								<Typography textAlign="center">Sign out</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar id="top" />
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
				<AppBar enableColorOnDark position="absolute">
					<Toolbar>
						<IconButton
							edge="start"
							aria-label={t("common:close")}
							sx={{ mr: 2, color: "primary.contrastText" }}
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
			<Drawer
				open
				variant="persistent"
				PaperProps={{ sx: { width: drawerWidth } }}
				sx={{
					display: {
						xs: "none",
						md: "block",
					},
					width: drawerWidth,
				}}
			>
				<DrawerContent tooltips={!drawerOpen} />
			</Drawer>
			<Box component="main" sx={{ ml: { xs: 0, md: `${drawerWidth}px` }, py: 4, px: 2 }}>
				{children}
			</Box>
		</>
	);
}
