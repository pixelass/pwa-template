import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const {
		query: { name },
	} = request;
	response.status(200).json({ name });
}
