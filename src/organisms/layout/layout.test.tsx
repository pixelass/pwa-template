/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { nanoid } from "nanoid";

import "@/mocks/jest";

import Layout from ".";

describe("Layout component", () => {
	it("should render children", () => {
		const text = nanoid();
		render(<Layout>{text}</Layout>);
		expect(screen.getByText(text)).toBeInTheDocument();
	});
});
