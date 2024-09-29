import "server-only";

import { Cast, Crew } from "@/interfaces/entities";
import { tmdbClient } from "./client";

const fetchMovieCredits = (movieId: string) =>
  tmdbClient<{
    id: number;
    cast: Cast[];
    crew: Crew[];
  }>(`/movie/${movieId}/credits`);

export default fetchMovieCredits;
