import "server-only";

import { ListResponse, Movie } from "@/interfaces/entities";
import { tmdbClient } from "./client";

const fetchPopularList = ({ page }: { page: number }) =>
  tmdbClient<ListResponse<Movie>>(`/movie/popular?page=${page}`, { revalidate: 86400 });

export default fetchPopularList;
