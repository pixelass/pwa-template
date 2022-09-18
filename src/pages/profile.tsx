import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Template from "@/templates/profile";

export default function Page() {
	return <Template />;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	return session
		? {
				props: {
					session,
					...(await serverSideTranslations(context.locale, ["common", "menu"])),
				},
		  }
		: {
				redirect: {
					destination: "/",
					permanent: false,
				},
		  };
};
