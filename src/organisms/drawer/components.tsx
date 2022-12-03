import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";

import { navigation } from "@/ions/configs/navigation";
import { useStore } from "@/ions/store";
import { spacing } from "@/ions/theme";
import NavItem from "@/molecules/nav-item";
import { DRAWER_WIDTH, DRAWER_WIDTH_MINI, DRAWER_WIDTH_MOBILE } from "@/organisms/layout/constants";
import { WrapperProps } from "@/organisms/layout/types";

export interface DrawerContentProps {
	withTooltips?: boolean;
	onNavigate?(): void;
}

export function DrawerContent({ withTooltips, onNavigate }: DrawerContentProps) {
	const { t } = useTranslation(["menu"]);
	const { pathname } = useRouter();
	const { data: session } = useSession();
	const drawerExpanded = useStore(state => state.drawerExpanded);

	const Wrapper = useMemo(
		() =>
			withTooltips
				? ({ children, title }: WrapperProps) => (
						<Tooltip disableInteractive title={title} placement="right">
							<Box sx={{ mx: -2, my: -1, px: 2, py: 1, display: "flex" }}>
								{children}
							</Box>
						</Tooltip>
				  )
				: ({ children }: WrapperProps) => <Fragment>{children}</Fragment>,
		[withTooltips]
	);

	return (
		<Box>
			{pathname === "/profile" && (
				<Box sx={{ px: 1 }}>
					<Avatar
						sx={{
							height: {
								xs: DRAWER_WIDTH_MOBILE - spacing * 2,
								md: drawerExpanded
									? DRAWER_WIDTH - spacing * 2
									: DRAWER_WIDTH_MINI - spacing * 2,
							},
							width: {
								xs: DRAWER_WIDTH_MOBILE - spacing * 2,
								md: drawerExpanded
									? DRAWER_WIDTH - spacing * 2
									: DRAWER_WIDTH_MINI - spacing * 2,
							},
						}}
					>
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
					<Divider sx={{ mt: 2 }} />
				</Box>
			)}
			<List component="nav" sx={{ width: "100%" }}>
				{navigation.map(item => (
					<NavItem
						key={item.key}
						href={item.href}
						data-cy={`sidebar:menu.${item.key}`}
						onClick={onNavigate}
					>
						<Wrapper title={t(`menu:${item.key}`)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
						</Wrapper>
						<ListItemText primary={t(`menu:${item.key}`)} />
					</NavItem>
				))}
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
			sx={{ display: { xs: "block", md: "none" }, width: DRAWER_WIDTH_MOBILE }}
			PaperProps={
				{
					"data-cy": "sidebar:mobile",
					sx: { width: DRAWER_WIDTH_MOBILE },
				} as Partial<PaperProps>
			}
			onClose={() => {
				useStore.getState().set({ drawerOpen: false });
			}}
			onOpen={() => {
				useStore.getState().set({ drawerOpen: true });
			}}
		>
			<Stack sx={{ flex: 1 }}>
				<AppBar
					color="inherit"
					position="sticky"
					sx={{ backgroundClip: "border-box", borderRadius: 0, border: 0, mb: 1 }}
				>
					<Toolbar sx={{ my: 1 }}>
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
				<Box sx={{ flex: 1 }}>
					<DrawerContent
						onNavigate={() => {
							useStore.getState().set({ drawerOpen: false });
						}}
					/>
				</Box>
				<Button
					onClick={() => {
						void signOut();
					}}
				>
					{t("common:signOut")}
				</Button>
			</Stack>
		</SwipeableDrawer>
	);
}

export interface PermanentDrawerProps {
	drawerWidth: number;
}

export function PermanentDrawer({ drawerWidth }: PermanentDrawerProps) {
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
			<Toolbar sx={{ mb: 3 }} />
			<DrawerContent withTooltips={!drawerExpanded} />
			<Toolbar />
			<AppBar
				color="inherit"
				position="fixed"
				sx={{
					backgroundClip: "border-box",
					borderRadius: 0,
					border: 0,
					top: "auto",
					bottom: 0,
					left: 0,
					px: 1,
					width: (drawerExpanded ? DRAWER_WIDTH : DRAWER_WIDTH_MINI) - 1,
				}}
			>
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
