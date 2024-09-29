import "server-only";

import { ListResponse, Movie } from "@/interfaces/entities";
import client from "./client";

const fetchPopularList = () =>
  client<ListResponse<Movie>>("https://api.themoviedb.org/3/movie/popular", { revalidate: 86400 });

export default fetchPopularList;
