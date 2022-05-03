import Home from "@/templates/home";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function Page() {
	return <Home />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
	},
});
