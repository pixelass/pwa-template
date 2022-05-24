import createTheme from "@mui/material/styles/createTheme";

const typography = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const dark = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#33aacc",
		},
	},
	typography,
});

export const light = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ccaa33",
		},
	},
	typography,
});

export const darkHighContrast = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#00aaff",
		},
	},
	typography,
});

export const lightHighContrast = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ffaa00",
		},
	},
	typography,
});
