import "server-only";

import qs from "query-string";
import { ListResponse, Movie } from "@/interfaces/entities";
import client from "./client";

const fetchSearchMovies = (query: string, page: number) =>
  client<ListResponse<Movie>>(
    `https://api.themoviedb.org/3/search/movie?${qs.stringify({
      query,
      page,
    })}`,
  );

export default fetchSearchMovies;
