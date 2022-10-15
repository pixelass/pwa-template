import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SWRConfig } from "swr";

import { useQuery } from "@/ions/hooks/graphql";
import { images } from "@/mocks/images";
import Template from "@/templates/dashboard";

const IMAGES_QUERY = /* GraphQL */ `
	query getImages {
		images {
			id
			label
			text
			src
			height
			width
			base64
		}
	}
`;

function PageWithData() {
	const { data } = useQuery(IMAGES_QUERY);
	const { t } = useTranslation(["meta"]);
	return (
		<>
			<Head>
				<title>{t("meta:dashboard.title")}</title>
				<meta name="description" content={t("meta:dashboard.description")} />
			</Head>
			<Template data={data} />
		</>
	);
}

export default function Page({ fallback }) {
	const { t } = useTranslation(["meta"]);
	return (
		<SWRConfig value={{ fallback }}>
			<Head>
				<title>{t("meta:dashboard.title")}</title>
				<meta name="description" content={t("meta:dashboard.description")} />
			</Head>
			<PageWithData />
		</SWRConfig>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	const data = {
		images: await images(),
	};
	return session
		? {
				props: {
					session,
					...(await serverSideTranslations(context.locale, ["common", "menu", "meta"])),
					fallback: {
						[IMAGES_QUERY]: data,
					},
				},
		  }
		: {
				redirect: {
					destination: "/auth/sign-in",
					permanent: false,
				},
		  };
};
