import {
	Session as NextAuthSession,
	User as NextAuthUser,
	Profile as NextAuthProfile,
} from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import { Except } from "type-fest";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
	 */
	interface Session extends Except<NextAuthSession, "user"> {
		user?: {
			id?: string;
			name?: string;
			email?: null;
			image?: string;
			// Add additional props
		};
	}

	interface User extends NextAuthUser {
		id?: string;
		// Add additional props
	}

	interface Profile extends NextAuthProfile {
		login?: string;
	}
}

declare module "next-auth/jwt" {
	/**
	 * Returned by the `jwt` callback and `getToken`, when using JWT sessions
	 */
	interface JWT extends NextAuthJWT {
		user: {
			name?: string;
			email: null;
			image?: string;
			// Add additional props
		};
	}
}
