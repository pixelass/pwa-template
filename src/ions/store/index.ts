import { Except } from "type-fest";
import create from "zustand";

export interface StoreModel {
	bool: boolean;
	set(modal: Except<StoreModel, "set">): void;
}

export const useStore = create<StoreModel>(set => ({
	bool: false,
	set(partial) {
		set(partial);
	},
}));
