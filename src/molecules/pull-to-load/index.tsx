import { Portal } from "@mui/base";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useRef } from "react";

import { Content } from "./styled";
import { PullToRefreshProps } from "./types";

import usePullToLoad from "@/ions/hooks/pull-to-load";

export default function PullToRefresh({
	color = "primary.contrastText",
	threshold = 192,
	onEnd: onEnd_,
	onActive: onActive_,
}: PullToRefreshProps) {
	const onEndRef = useRef(onEnd_);
	const onActiveRef = useRef(onActive_);

	const onEnd = useCallback(() => {
		if (onEndRef.current) {
			onEndRef.current();
		}
	}, []);

	const onActive = useCallback(() => {
		if (onActiveRef.current) {
			onActiveRef.current();
		}
	}, []);

	const { active, progress, valid, visible } = usePullToLoad(threshold, { onEnd, onActive });

	return (
		visible && (
			<Portal>
				<Content sx={{ top: theme => theme.spacing(1) }}>
					<CircularProgress
						variant={active || valid ? "indeterminate" : "determinate"}
						value={progress * 100}
						sx={{
							opacity: active || valid ? 1 : progress,
							color: color,
							transitionDuration: "none",
							".MuiCircularProgress-circle": {
								transition: "none",
							},
						}}
					/>
				</Content>
			</Portal>
		)
	);
}
