import { hasOperationName } from "../utils/graphql";

import hkdf from "@panva/hkdf";
import { EncryptJWT, JWTPayload } from "jose";

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L113-L121
async function getDerivedEncryptionKey(secret: string) {
	return await hkdf("sha256", secret, "", "NextAuth.js Generated Encryption Key", 32);
}

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L16-L25
export async function encode(token: JWTPayload, secret: string): Promise<string> {
	const maxAge = 30 * 24 * 60 * 60; // 30 days
	const encryptionSecret = await getDerivedEncryptionKey(secret);
	return await new EncryptJWT(token)
		.setProtectedHeader({ alg: "dir", enc: "A256GCM" })
		.setIssuedAt()
		.setExpirationTime(Math.round(Date.now() / 1000 + maxAge))
		.setJti("test")
		.encrypt(encryptionSecret);
}

Cypress.Commands.add("login", function (userObj) {
	// Generate and set a valid cookie from the fixture that next-auth can decrypt
	cy.wrap(null)
		.then(() => encode(userObj, Cypress.env("NEXT_AUTH_SECRET")))
		.then(encryptedToken => {
			cy.setCookie("next-auth.session-token", encryptedToken);
			cy.setCookie("__Secure-next-auth.session-token", encryptedToken, {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: true,
			});
		});
});

/**
 * Logout stub for next-auth
 */
Cypress.Commands.add("logout", function () {
	cy.clearCookie("next-auth.session-token");
	cy.clearCookie("__Secure-next-auth.session-token");
});

Cypress.Commands.add("gql", function (operations) {
	cy.intercept("POST", Cypress.env("backendUri"), req => {
		for (const { operationName, data, alias } of operations) {
			if (hasOperationName(req, operationName)) {
				if (alias) {
					req.alias = alias;
				}
				req.reply(res => {
					res.body.data = data;
				});
			}
		}
	});
});

Cypress.Commands.add("dataCy", function (value) {
	return cy.get(`[data-cy="${value}"]`);
});

Cypress.Commands.add("dataTestId", function (value) {
	return cy.get(`[data-testid="${value}"]`);
});
