import { Theme } from "@mui/material";
import { ResponsiveStyleValue, SystemStyleObject } from "@mui/system";
import { Property } from "csstype";

export interface PullToRefreshProps {
	threshold?: number;
	color?:
		| SystemStyleObject<Theme>
		| ResponsiveStyleValue<Property.Color | string[]>
		| ((theme: Theme) => ResponsiveStyleValue<Property.Color | string[]>);

	onActive?(): void;
	onEnd?(): void;
}
