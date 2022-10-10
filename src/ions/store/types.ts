import { Except } from "type-fest";

export interface StoreModel {
	drawerOpen: boolean;
	drawerExpanded: boolean;
	installPromptOpen: boolean;
	set(partial: Partial<Except<StoreModel, "set">>): void;
}
