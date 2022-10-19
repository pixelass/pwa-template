import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import Template from "@/templates/profile";

export default function Page() {
	const { t } = useTranslation(["meta"]);
	return (
		<>
			<Head>
				<title>{t("meta:profile.title")}</title>
				<meta name="description" content={t("meta:profile.description")} />
			</Head>
			<Template />
		</>
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
