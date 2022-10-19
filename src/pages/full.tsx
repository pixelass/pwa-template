import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutFull from "@/organisms/layout/full";

export default function Page() {
	return (
		<LayoutFull>
			<Box
				sx={theme => ({
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					inset: 0,
					p: 4,
					textAlign: "center",
					borderRadius: 1,
					boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
				})}
			>
				<Typography variant="h2">Full Area Layout</Typography>
			</Box>
		</LayoutFull>
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
