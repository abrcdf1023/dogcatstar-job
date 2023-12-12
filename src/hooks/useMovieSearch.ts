import useSWR, { SWRResponse } from "swr";

import qs from "query-string";
import { ListResponse, Movie } from "@/interfaces/entities";
import client from "@/apis/client";

export default function useMovieSearch(query: string, page: number): SWRResponse<ListResponse<Movie>> {
  const res = useSWR<ListResponse<Movie>>(
    query
      ? `https://api.themoviedb.org/3/search/movie?${qs.stringify({
          query,
          page,
        })}`
      : null,
    client,
    {
      revalidateOnFocus: false,
    },
  );

  return res;
}
