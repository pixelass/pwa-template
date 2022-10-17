import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutContained from "@/organisms/layout/contained";

export default function Page() {
	const { t } = useTranslation(["menu"]);
	return (
		<LayoutContained>
			<Typography variant="h2">{t("menu:notifications")}</Typography>
		</LayoutContained>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	return session
		? {
				props: {
					session,
					...(await serverSideTranslations(context.locale, ["common", "menu", "meta"])),
				},
		  }
		: {
				redirect: {
					destination: "/auth/sign-in",
					permanent: false,
				},
		  };
};
