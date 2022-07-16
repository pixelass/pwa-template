import create from "zustand";

import { StoreModel } from "@/ions/store/types";

export const useStore = create<StoreModel>(set => ({
	count: 0,
	set(partial) {
		set(partial);
	},
}));
