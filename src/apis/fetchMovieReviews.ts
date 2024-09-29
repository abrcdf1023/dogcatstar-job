import "server-only";

import { Reviews } from "@/interfaces/entities";
import { tmdbClient } from "./client";

const fetchMovieReviews = (movieId: string) => tmdbClient<Reviews>(`/movie/${movieId}/reviews`);

export default fetchMovieReviews;
