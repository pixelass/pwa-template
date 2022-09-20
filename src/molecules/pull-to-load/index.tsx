import { Portal } from "@mui/base";
import CircularProgress from "@mui/material/CircularProgress";

import { Content } from "./styled";
import { PullToRefreshProps } from "./types";

import usePullToLoad from "@/ions/hooks/pull-to-load";

export default function PullToRefresh({
	color = "primary.contrastText",
	threshold = 192,
	onEnd,
	onActive,
}: PullToRefreshProps) {
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
