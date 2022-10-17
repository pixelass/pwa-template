import process from "node:process";

import { createApi } from "unsplash-js";

export interface UnsplashQuery {
	query: string;
	page?: string;
	per_page?: string;
}

export async function searchPhotos(query_: UnsplashQuery) {
	const query = query_.query as string;
	const page = Number.parseInt(query_.page ?? "1", 10);
	const perPage = Number.parseInt(query_.per_page ?? "10", 10);
	const serverApi = createApi({
		accessKey: process.env.UNSPLASH_ACCESS_KEY,
	});

	const data = await serverApi.search.getPhotos({
		query,
		page,
		perPage,
	});
	return data.response.results;
}
