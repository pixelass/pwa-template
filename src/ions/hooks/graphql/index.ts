import axios from "axios";
import useSWR from "swr";

export async function fetcher(query: string) {
	try {
		const response = await axios.post("/api/graphql", { query });
		return response.data.data;
	} catch (error) {
		return error;
	}
}

export function useQuery(query: string) {
	return useSWR(query, fetcher);
}
