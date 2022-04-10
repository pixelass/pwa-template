import { Except } from "type-fest";
import create from "zustand";

export interface StoreModel {
	count: number;
	set(modal: Except<StoreModel, "set">): void;
}

export const useStore = create<StoreModel>(set => ({
	count: 0,
	set(partial) {
		set(partial);
	},
}));
