import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Template from "@/templates/home";

export default function Page() {
	return <Template />;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	console.log(session);
	return session
		? {
				redirect: {
					destination: "/dashboard",
					permanent: false,
				},
		  }
		: {
				props: {
					session,
					...(await serverSideTranslations(context.locale, ["common", "menu"])),
				},
		  };
};
