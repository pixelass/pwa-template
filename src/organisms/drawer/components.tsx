import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PaperProps } from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";

import { useStore } from "@/ions/store";
import { DRAWER_WIDTH } from "@/organisms/layout/constants";
import { WrapperProps } from "@/organisms/layout/types";

export function DrawerContent({
	withTooltips,
	onNavigate,
}: {
	withTooltips?: boolean;
	onNavigate?(): void;
}) {
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
				<NextLink passHref href="/profile">
					<ListItemButton
						component="a"
						data-cy="sidebar:menu.profile"
						selected={asPath === "/profile"}
						sx={{ color: "text.primary", textDecoration: "none" }}
						onClick={onNavigate}
					>
						<Wrapper title={t("menu:profile")}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
						</Wrapper>
						<ListItemText primary={t("menu:profile")} />
					</ListItemButton>
				</NextLink>
				<NextLink passHref href="/dashboard">
					<ListItemButton
						component="a"
						selected={asPath === "/dashboard"}
						sx={{ color: "text.primary", textDecoration: "none" }}
						onClick={onNavigate}
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
			PaperProps={
				{ "data-cy": "sidebar:mobile", sx: { width: DRAWER_WIDTH } } as Partial<PaperProps>
			}
			onClose={() => {
				useStore.getState().set({ drawerOpen: false });
			}}
			onOpen={() => {
				useStore.getState().set({ drawerOpen: true });
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
							useStore.getState().set({ drawerOpen: false });
						}}
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DrawerContent
				onNavigate={() => {
					useStore.getState().set({ drawerOpen: false });
				}}
			/>
		</SwipeableDrawer>
	);
}

export function PermanentDrawer({ drawerWidth }) {
	const drawerExpanded = useStore(state => state.drawerExpanded);
	const { t } = useTranslation(["common"]);
	const { breakpoints } = useTheme();
	const mdUp = useMediaQuery(breakpoints.up("md"));

	return (
		<Drawer
			open
			variant="persistent"
			PaperProps={
				{
					"data-cy": drawerExpanded ? "sidebar:desktop" : "sidebar:desktop.collapsed",
					sx: {
						width: drawerWidth,
					},
				} as Partial<PaperProps>
			}
			className={clsx({
				["MuiDrawer-collapsed"]: !drawerExpanded,
			})}
			sx={{
				display: {
					xs: "none",
					md: "block",
				},
				width: drawerWidth,
			}}
		>
			<DrawerContent withTooltips={!drawerExpanded} />
			<AppBar color="transparent" position="absolute" sx={{ top: "auto", bottom: 0 }}>
				<Toolbar>
					<Tooltip title={drawerExpanded ? t("common:collapse") : t("common:expand")}>
						<IconButton
							edge="start"
							data-cy="sidebar:collapse"
							aria-label={t("common:open")}
							sx={{
								color: "inherit",
							}}
							onClick={() => {
								useStore.getState().set({ drawerExpanded: !drawerExpanded });
							}}
						>
							{drawerExpanded && mdUp ? <MenuOpenIcon /> : <MenuIcon />}
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Drawer>
	);
}
