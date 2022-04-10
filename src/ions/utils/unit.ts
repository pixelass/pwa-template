/**
 * Appends the unit suffix to a number
 * @param {number} n
 * @return {`${number}rem`}
 * @example
 * rem(10) // "10rem"
 */
export const rem = (n: number): `${number}rem` => `${n}rem`;

/**
 * Converts a number from pixel to rem and adds the unit suffix.
 *
 * @param {number} pixel
 * @param {number} rootFontSize
 * @return {`${number}rem`}
 * @example
 * pxToRem(16) // "1rem"
 */
export const pxToRem = (pixel: number, rootFontSize = 16) => rem(pixel / rootFontSize);
