import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const StoreContext = createContext({ mounted: false });

export function useStoreContext() {
	return useContext(StoreContext);
}

export default function StoreProvider({ children }: { children?: ReactNode }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return <StoreContext.Provider value={{ mounted }}>{children}</StoreContext.Provider>;
}
