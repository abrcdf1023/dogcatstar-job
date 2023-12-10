import "server-only";

import { Movie } from "@/interfaces/entities";
import client from "./client";

const fetchMovieDetail = (movieId: string) => client<Movie>(`https://api.themoviedb.org/3/movie/${movieId}`);

export default fetchMovieDetail;
