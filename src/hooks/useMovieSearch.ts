import qs from "query-string";
import useSWR, { SWRResponse } from "swr";

import client from "@/apis/client";

export default function useMovieSearch<D>(query: string, page: number): SWRResponse<D> {
  const res = useSWR<D>(
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
