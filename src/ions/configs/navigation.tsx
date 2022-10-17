import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaletteIcon from "@mui/icons-material/Palette";
import PersonIcon from "@mui/icons-material/Person";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import { ReactNode } from "react";

export interface NavItemType {
	href: string;
	key: string;
	icon: ReactNode;
}

export const navigation: NavItemType[] = [
	{
		href: "/profile",
		key: "profile",
		icon: <PersonIcon />,
	},
	{
		href: "/dashboard",
		key: "dashboard",
		icon: <DashboardIcon />,
	},
	{
		href: "/full",
		key: "fullArea",
		icon: <WidthFullIcon />,
	},
	{
		href: "/palette",
		key: "palette",
		icon: <PaletteIcon />,
	},
	{
		href: "/notifications",
		key: "notifications",
		icon: <NotificationsIcon />,
	},
];
