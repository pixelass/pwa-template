export default async function handler(request, response) {
	const {
		query: { name },
	} = request;
	response.status(200).json({ name });
}
