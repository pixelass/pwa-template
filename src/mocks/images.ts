import { searchPhotos } from "@/ions/api/unsplash";

export async function images() {
	return searchPhotos({ query: "patterns", per_page: "12" });
}
