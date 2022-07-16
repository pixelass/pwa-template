import { Except } from "type-fest";

export interface StoreModel {
	count: number;

	set(modal: Except<StoreModel, "set">): void;
}
