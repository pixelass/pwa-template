import indigo from "@mui/material/colors/indigo";
import pink from "@mui/material/colors/pink";
import createTheme from "@mui/material/styles/createTheme";

const typography = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const light = createTheme({
	palette: {
		primary: {
			main: indigo[700],
		},
		secondary: {
			main: pink.A700,
		},
	},
	typography,
});

export const dark = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: indigo[200],
		},
		secondary: {
			main: pink.A200,
		},
	},
	typography,
});
