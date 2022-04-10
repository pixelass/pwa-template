import { css, Global } from "@emotion/react";
import React from "react";

export const fontFaces = (
	<Global
		styles={css`
			body {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
					sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			}
		`}
	/>
);

export const globalStyles = (
	<Global
		styles={css`
			#__next {
				display: contents;
			}
		`}
	/>
);
