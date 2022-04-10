/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-unassigned-import
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Card from ".";

describe("Card component", () => {
	it("should render children", () => {
		const text = "Hello World";
		render(<Card>{text}</Card>);
		expect(screen.getByText(text)).toBeInTheDocument();
	});
});
