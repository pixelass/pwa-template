import { jest } from "@jest/globals";

import { USER } from "@/mocks/user";

jest.mock("next/router", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			asPath: "/dashboard",
		};
	},
}));

jest.mock("next-auth/react", () => ({
	useSession() {
		return {
			data: {
				user: USER,
			},
		};
	},
}));

jest.mock("next-i18next", () => ({
	useTranslation() {
		return {
			t(key) {
				return key;
			},
		};
	},
}));
