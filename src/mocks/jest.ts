import { jest } from "@jest/globals";

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
				user: {
					id: 1,
					name: "Alex Morrison",
					email: "alex.morrison@example.com",
					image: "/assets/images/random-user.jpg",
				},
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
