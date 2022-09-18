import { Except } from "type-fest";

export interface StoreModel {
	drawerOpen: boolean;
	installPromptOpen: boolean;
	set(modal: Partial<Except<StoreModel, "set">>): void;
}
