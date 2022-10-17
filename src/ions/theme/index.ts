import blueGrey from "@mui/material/colors/blueGrey";
import cyan from "@mui/material/colors/cyan";
import deepOrange from "@mui/material/colors/deepOrange";
import orange from "@mui/material/colors/orange";
import red from "@mui/material/colors/red";
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
		MuiCssBaseline: {
			styleOverrides: {
				":root": {
					colorScheme: "light dark",
					userSelect: "none",
				},
				"#__next": {
					display: "contents",
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					borderRadius: shape.borderRadius,
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					padding: `${spacing}px 0`,
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
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					margin: `${spacing / 2}px 0`,
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
	};
	return components;
}

const paletteDark: PaletteOptions = {
	mode: "dark",
	primary: {
		main: cyan[500],
	},
	secondary: {
		main: deepOrange[300],
	},
	error: {
		main: red[300],
	},
	warning: {
		main: orange[500],
	},
	background: {
		default: blueGrey[900],
		paper: blueGrey[900],
	},
};
const paletteLight: PaletteOptions = {
	mode: "light",
	primary: {
		main: cyan[700],
	},
	secondary: {
		main: deepOrange[600],
	},
	error: {
		main: red[500],
	},
	warning: {
		main: orange[800],
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
