import { NextApiRequest, NextApiResponse } from "next";

import { searchPhotos, UnsplashQuery } from "@/ions/api/unsplash";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
	const path_ = (request.query.args as string[]).join("/");
	const query: UnsplashQuery = {
		query: request.query.query as string,
		page: request.query.page as string | undefined,
		per_page: request.query.per_page as string | undefined,
	};
	switch (path_) {
		case "search/photos":
			searchPhotos(query)
				.then(data => {
					response.status(200).json(data.response);
				})
				.catch(() => {
					response.status(500).end();
				});
			break;
		default:
			response.status(404).send("NOT_FOUND");
			break;
	}
}
