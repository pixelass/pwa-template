import { getPlaiceholder } from "plaiceholder";

import { searchPhotos } from "@/ions/api/unsplash";

export async function images() {
	const images_ = await searchPhotos({ query: "patterns", per_page: "12" });
	return Promise.all(
		images_.response.results.map(async image => {
			try {
				const { base64 } = await getPlaiceholder(decodeURIComponent(image.urls.full), {
					size: 16,
				});
				return {
					...image,
					base64,
				};
			} catch {
				return image;
			}
		})
	);
}
