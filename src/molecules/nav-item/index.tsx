import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Except } from "type-fest";

export interface NavItemProps extends Except<ListItemButtonProps, "selected" | "sx"> {
	href?: string;
}

export default function NavItem({ children, href, ...props }: NavItemProps) {
	const { pathname } = useRouter();
	return (
		<NextLink legacyBehavior passHref href={href}>
			<ListItemButton
				{...props}
				selected={pathname === href}
				sx={{ color: "text.primary", textDecoration: "none" }}
			>
				{children}
			</ListItemButton>
		</NextLink>
	);
}
