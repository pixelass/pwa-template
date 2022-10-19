import { Components } from "@mui/material/styles/components";
import { Palette } from "@mui/material/styles/createPalette";
import { Theme } from "@mui/material/styles/createTheme";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export type TypographyType = TypographyOptions | ((palette: Palette) => TypographyOptions);
export type ComponentsType = Components<Omit<Theme, "components">>;
