import { NextApiRequest, NextApiResponse } from "next";

import { searchPhotos } from "@/ions/api/unsplash";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const path_ = (request.query.args as string[]).join("/");

	switch (path_) {
		case "search/photos":
			try {
				const data = await searchPhotos({
					query: request.query.query as string,
					page: request.query.page as string | undefined,
					per_page: request.query.per_page as string | undefined,
				});
				response.status(200).json(data);
			} catch (error) {
				response.status(500).json(error.message);
			}

			break;
		default:
			response.status(404).send("NOT_FOUND");
			break;
	}
}
