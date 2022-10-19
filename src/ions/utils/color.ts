export function setOpacity(color: string, alpha: number) {
	const [, hex] = color.split("#");
	const hexColor = hex.length === 6 ? `#${hex}` : `#${hex}${hex}`;
	return `${hexColor}${alpha > 0 ? Math.round(255 * alpha).toString(16) : ""}`;
}
