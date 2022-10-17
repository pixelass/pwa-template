import { searchPhotos } from "@/ions/api/unsplash";

export async function images() {
	const images_ = await searchPhotos({ query: "patterns", per_page: "12" });
	return images_.response.results;
}
