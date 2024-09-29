import "server-only";

import { ListResponse, Movie } from "@/interfaces/entities";
import { tmdbClient } from "./client";

const fetchPopularList = () => tmdbClient<ListResponse<Movie>>("/movie/popular?page=1", { revalidate: 86400 });

export default fetchPopularList;
