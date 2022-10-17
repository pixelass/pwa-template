import { ReactElement, ReactNode } from "react";

export interface WrapperProps {
	children?: ReactElement;
	title: string;
}

export interface LayoutProps {
	children?: ReactNode;
	title?: string;
	fab?: ReactNode;

	onPullActive?(): void;

	onPullEnd?(): void;
}
