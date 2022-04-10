import { pxToRem, rem } from "./unit";

describe("rem", () => {
	it("should add the unit as a suffix", () => {
		expect(rem(10)).toBe("10rem");
	});
});

describe("pxToRem", () => {
	it("should convert a number in pixel to a rem string", () => {
		expect(pxToRem(16)).toBe("1rem");
	});
});
