import blue from "@mui/material/colors/blue";
import blueGrey from "@mui/material/colors/blueGrey";
import deepPurple from "@mui/material/colors/deepPurple";
import lightBlue from "@mui/material/colors/lightBlue";
import teal from "@mui/material/colors/teal";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import createTheme from "@mui/material/styles/createTheme";

import { ComponentsType, TypographyType } from "./types";

const typography: TypographyType = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

const shape = {
	borderRadius: 8,
};

export const spacing = 8;

function buildComponents() {
	const components: ComponentsType = {
		MuiCssBaseline: {
			styleOverrides: `
		:root {
			color-scheme: light dark;
			user-select: none;
		}
		#__next {
			display: contents;
		}
		`,
		},
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				enableColorOnDark: true,
			},
			styleOverrides: {
				root: {
					border: `${spacing}px solid transparent`,
					borderRadius: shape.borderRadius + spacing,
					backgroundClip: "padding-box",
				},
			},
		},
		MuiAvatar: {
			defaultProps: {
				variant: "rounded",
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
		MuiCard: {
			defaultProps: {},
		},
		MuiList: {
			styleOverrides: {
				root: {
					padding: `${spacing}px 0`,
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					margin: "4px 0",
					minWidth: 24,
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					marginLeft: spacing * 3,
					".MuiDrawer-collapsed &": {
						display: "none",
					},
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: `${spacing * 1.5}px ${spacing * 1.5}px`,
					border: `${spacing}px solid transparent`,
					borderRadius: shape.borderRadius + spacing,
					backgroundClip: "padding-box",
					"@media (min-width: 600px)": {
						padding: `${spacing * 1.5}px ${spacing * 2.5}px`,
					},
				},
			},
		},
	};
	return components;
}

const paletteDark: PaletteOptions = {
	mode: "dark",
	primary: {
		main: teal[300],
	},
	secondary: {
		main: lightBlue[500],
	},
	background: {
		default: blueGrey[900],
		paper: blueGrey[900],
	},
};
const paletteLight: PaletteOptions = {
	mode: "light",
	primary: {
		main: deepPurple[500],
	},
	secondary: {
		main: blue[500],
	},
	background: {
		default: blueGrey[50],
		paper: blueGrey[50],
	},
};

export const dark = createTheme({
	palette: paletteDark,
	shape,
	spacing,
	typography,
	components: buildComponents(),
});

export const light = createTheme({
	palette: paletteLight,
	shape,
	spacing,
	typography,
	components: buildComponents(),
});
