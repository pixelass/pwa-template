import { useEffect, useState } from "react";

declare global {
	interface Navigator {
		standalone?: boolean;
	}
}

export default function useInstallPrompt() {
	const [state, setState] = useState(false);
	useEffect(() => {
		const platformsWithPrompt = ["iPhone", "iPad"];
		const isStandalone = window.navigator.standalone === true;
		const platform = navigator.platform;
		const isIOS = platformsWithPrompt.includes(platform);
		setState(isIOS && !isStandalone);
	}, []);
	return state;
}
