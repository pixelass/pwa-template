export async function copyText(value: string) {
	return navigator.clipboard.writeText(value);
}
