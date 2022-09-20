import { useEffect, useState } from "react";

import { UsePullToLoadOptions } from "./types";

/**
 * A hook to provide animation logic for a pull to load component.
 * The native scroll behavior is tracked.
 *
 * @param {number} threshold
 * - The minimum distance a negative scroll has to reach to call the onEnd callback.
 * @param {UsePullToLoadOptions} options
 * @param {() => void} onActive
 * - The callback that is called when the scroll movement springs back to 0 and the threshold was
 * reached. It is important that the callback is memoized to prevent unwanted behavior. If the
 * parent component can't guarantee the memoization then the ancestor that defines it has to memoize
 * it.
 * @param {() => void} onEnd
 * - The callback that is called when the  threshold was  reached. It is important that the callback
 * is memoized to prevent unwanted behavior. If the parent component can't guarantee the memoization
 * then the ancestor that defines it has to memoize it.
 * @returns {{ active: boolean, progress: number, valid: boolean, visible: boolean }}
 *
 * @example
 * 	const { active, y } = usePullToLoad(192, {
 * 	  onActive: useCallback(()=> {
 * 	    console.log("active");
 * 	  }, []),
 * 	  onEnd: useCallback(()=> {
 * 	    console.log("reload");
 * 	  }, [])
 * 	});
 * */
export default function usePullToLoad(
	threshold: number,
	{ onEnd, onActive }: UsePullToLoadOptions
) {
	// Active during spring while the movement is greater than the threshold
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	const [valid, setValid] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Flags to keep track of the behavior
		let isActivated = false;
		let isDown = false;
		let wasDown = false;
		let isValid = false;
		// Reference
		let animationFrame;

		// Handle the original scroll and control the spring api
		function handleScroll() {
			animationFrame = window.requestAnimationFrame(() => {
				const movementY = -window.scrollY;
				// Fast decision means fast renders
				// We only need to listen when the movement causes an offset of lower than 0
				// That behavior only happens in standalone iOS, therefore the code below should
				// only affect iOS in standalone mode
				if (movementY < 0) {
					return;
				}
				// When the user scrolled and let go
				if (wasDown && !isDown) {
					wasDown = false;
				}
				// Only call the onEnd if the threshold was reached
				// And the movement has reached 0
				if (isValid && Math.abs(movementY) === 0) {
					isValid = false;
					if (onEnd) {
						onEnd();
					}
				}

				setActive(() => {
					const nextState = (wasDown || isValid) && movementY > threshold;
					// Only call the onActive once
					if (!isActivated && nextState && onActive) {
						onActive();
					}
					isActivated = nextState;
					return nextState;
				});
				setVisible(wasDown || isValid);
				setProgress(movementY / threshold);
			});
		}

		// When the user touch starts
		function handleTouchStart() {
			// Then the down flags are activated
			isDown = true;
			wasDown = true;
			isValid = false;
			setValid(isValid);
		}

		// When the user touch ends
		function handleTouchEnd() {
			// Then the down flag is deactivated
			isDown = false;
			// And the movement is validated
			// It has to be greater than the threshold
			isValid = -window.scrollY > threshold;
			setValid(isValid);
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [threshold, onActive, onEnd]);

	return { active, progress, valid, visible };
}
