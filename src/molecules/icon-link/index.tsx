import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { NavItemType } from "@/ions/configs/navigation";

export interface IconLinkProps {
	link: NavItemType;
}

export default function IconLink({ link }: IconLinkProps) {
	const { t } = useTranslation(["menu"]);
	return (
		<Link legacyBehavior passHref href={link.href}>
			<IconButton component="a" color="inherit" aria-label={t(`menu:${link.key}`)}>
				{link.icon}
			</IconButton>
		</Link>
	);
}
