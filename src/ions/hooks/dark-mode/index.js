import { useLayoutEffect, useState } from "react";

/**
 * A hook to detect the preferred color-scheme of users.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme}
 *
 * It does not store data or allow manually adjusting the mode.
 *
 * The return value changes when the color-scheme of the user changes, by listening to the event.
 *
 * This hook uses LayoutEffect to prevent a paint flash on the in initial load.
 * {@link https://reactjs.org/docs/hooks-reference.html#uselayouteffect}
 *
 * You should only use this hook on the root level of your application where you configure your
 * ThemeProvider is configured.
 *
 * @param {boolean} [defaultMode = true]
 * - The developer preferred color mode. This value should never be effective, yet it might come in
 *   handy for other mechanisms. You shouldn't usually set the value.
 * @returns {boolean}
 *
 * @example
 * const mode = useDarkMode(true);
 * const theme = useMemo(() => (mode ? dark : light), [mode]);
 * return (
 *   <ThemeProvider theme={theme}>
 *     <Component/>
 *   </ThemeProvider>
 * );
 */
export default function useDarkMode(defaultMode = true) {
	const [mode, setMode] = useState(defaultMode);

	useLayoutEffect(() => {
		const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
		setMode(mediaQueryList.matches);

		function handleChange(event_) {
			setMode(event_.matches);
		}

		mediaQueryList.addEventListener("change", handleChange);
		return () => {
			mediaQueryList.removeEventListener("change", handleChange);
		};
	}, []);
	return mode;
}
