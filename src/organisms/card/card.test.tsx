/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Card from ".";

describe("Card component", () => {
	it("should render children", () => {
		const text = "Card component";
		render(<Card>{text}</Card>);
		expect(screen.getByText(text)).toBeInTheDocument();
	});
});
