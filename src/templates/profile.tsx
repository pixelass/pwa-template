import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";

import Layout from "@/organisms/layout";

export default function Template() {
	const { t } = useTranslation(["menu"]);
	return (
		<Layout title="Profile">
			<Head>
				<title>PWA Template</title>
				<meta name="description" content="PWA template with Next.js and MUI" />
			</Head>
			<Typography variant="h2">{t("menu:profile")}</Typography>
		</Layout>
	);
}
