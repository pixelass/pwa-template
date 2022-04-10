import createTheme from "@mui/material/styles/createTheme";

const typography = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography,
});
