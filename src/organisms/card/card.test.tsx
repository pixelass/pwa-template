/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { nanoid } from "nanoid";

import Card from ".";

describe("Card component", () => {
	it("should render children", () => {
		const text = nanoid();
		render(<Card>{text}</Card>);
		expect(screen.getByText(text)).toBeInTheDocument();
	});
});
