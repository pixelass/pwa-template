import "i18next";
import type auth from "../public/static/locales/en/auth.json";
import type common from "../public/static/locales/en/common.json";
import type errors from "../public/static/locales/en/errors.json";
import type forms from "../public/static/locales/en/forms.json";
import type menu from "../public/static/locales/en/menu.json";
import type meta from "../public/static/locales/en/meta.json";

interface I18nNamespaces {
	auth: typeof auth;
	common: typeof common;
	errors: typeof errors;
	forms: typeof forms;
	menu: typeof menu;
	meta: typeof meta;
}

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "common";
	}
}
