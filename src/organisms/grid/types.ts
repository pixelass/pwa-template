import { MasonryProps as MuiMasonryProps } from "@mui/lab/Masonry";
import { Grid2Props as MuiGridProps } from "@mui/material/Unstable_Grid2";
import { Except } from "type-fest";

export type MasonryProps = Except<MuiMasonryProps, "columns" | "spacing">;
export type GridProps = Except<MuiGridProps, "columns" | "spacing" | "container">;
