export const encode = (text: string) =>
	text
		.split("")
		.map(c => c.charCodeAt(0))
		.map(n => `${n.toString(16)}`.slice(-2))
		.join("");

export const decode = (encoded: string) =>
	encoded
		.match(/.{1,2}/g)
		.map(hex => Number.parseInt(hex, 16))
		.map(charCode => String.fromCharCode(charCode))
		.join("");

export const encodeJSON = <T>(input: T) => encode(JSON.stringify(input));

export const decodeJSON = <T>(input: string) => JSON.parse(decode(input)) as T;
