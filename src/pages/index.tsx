import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Page() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession({ ctx: context });
	return session
		? {
				redirect: {
					destination: "/dashboard",
					permanent: false,
				},
		  }
		: {
				redirect: {
					destination: "/auth/sign-in",
					permanent: false,
				},
		  };
};
