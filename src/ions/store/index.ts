import create from "zustand";

export interface StoreModel {
	modal: boolean;
	setModal(modal: boolean): void;
}

export const useStore = create<StoreModel>(set => ({
	modal: false,
	setModal(modal) {
		set({ modal });
	},
}));
