import { setOpacity } from "./color";

describe("setOpacity", () => {
	it("should set opacity to full", () => {
		expect(setOpacity("#000", 1)).toBe("#000000ff");
	});
	it("should set opacity to none", () => {
		expect(setOpacity("#000", 0)).toBe("#000000");
	});
	it("should set opacity to half", () => {
		expect(setOpacity("#000", 0.5)).toBe("#00000080");
	});
});
