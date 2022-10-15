import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import Template from "@/templates/sign-out";

export default function Page() {
	const { t } = useTranslation(["meta"]);
	return (
		<>
			<Head>
				<title>{t("meta:auth.signOut.title")}</title>
				<meta name="description" content={t("meta:auth.signOut.description")} />
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
					...(await serverSideTranslations(context.locale, ["common", "auth", "meta"])),
				},
		  }
		: {
				redirect: {
					destination: "/auth/sign-in",
					permanent: false,
				},
		  };
};
