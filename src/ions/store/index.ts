import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreModel } from "./types";

import { useStoreContext } from "@/ions/store/context";

const usePersistedStore = create<StoreModel>()(
	devtools(
		persist(
			set => ({
				drawerOpen: false,
				drawerExpanded: true,
				installPromptOpen: true,

				set(partial) {
					set(partial);
				},
			}),
			{
				name: process.env.NEXT_PUBLIC_APP_KEY,
				partialize: state =>
					Object.fromEntries(
						Object.entries(state).filter(([key]) =>
							["drawerExpanded", "installPromptOpen"].includes(key)
						)
					),
			}
		)
	)
);

export const useStore = ((selector, compare) => {
	const store = usePersistedStore(selector, compare);
	const { mounted } = useStoreContext();
	return mounted
		? store
		: selector({
				drawerOpen: false,
				drawerExpanded: true,
				installPromptOpen: true,

				set() {
					/**/
				},
		  });
}) as typeof usePersistedStore;

useStore.getState = usePersistedStore.getState;
