import create from "zustand";

import { StoreModel } from "./types";

export const useStore = create<StoreModel>(set => ({
	drawerOpen: false,
	installPromptOpen: true,

	set(partial) {
		set(partial);
	},
}));
