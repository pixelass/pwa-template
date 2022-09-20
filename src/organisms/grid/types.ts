import { GridProps as MuiGridProps } from "@mui/material/Grid";
import { Except } from "type-fest";

export type GridProps = Except<MuiGridProps, "item" | "columns" | "container" | "spacing">;
