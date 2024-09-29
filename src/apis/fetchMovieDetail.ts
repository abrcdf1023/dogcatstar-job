import "server-only";

import { Movie } from "@/interfaces/entities";
import { tmdbClient } from "./client";

const fetchMovieDetail = (movieId: string) => tmdbClient<Movie>(`/movie/${movieId}`);

export default fetchMovieDetail;
