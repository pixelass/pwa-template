import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { USER } from "@/mocks/user";

export const authOptions = {
	// Configure one or more authentication providers
	secret: process.env.NEXT_AUTH_SECRET,
	pages: {
		signIn: "/auth/sign-in",
		signOut: "/auth/sign-out",
		error: "/auth/error", // Error code passed in query string as ?error=
		verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign-in form (e.g. "Sign in with...")
			name: "credentials",
			// The credentials are used to generate a suitable form on the sign-in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Add logic here to look up the user from the credentials supplied

				const authenticated =
					credentials.username === process.env.DEMO_USERNAME &&
					credentials.password === process.env.DEMO_PASSWORD;

				if (authenticated) {
					// Any object returned will be saved in `user` property of the JWT
					return USER;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
};

export default NextAuth(authOptions);
