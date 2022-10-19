import { Theme } from "@mui/material/styles/createTheme";
import { ResponsiveStyleValue, SystemStyleObject } from "@mui/system/styleFunctionSx";
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
