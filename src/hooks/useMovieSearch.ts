import * as React from "react";
import useSWRInfinite from "swr/infinite";

import qs from "query-string";
import { ListResponse, Movie } from "@/interfaces/entities";
import client from "@/apis/client";

const fetcher = (url: string) => client<ListResponse<Movie>>(url).then((res) => res.results);

export default function useMovieSearch(query?: string) {
  const getKey = (pageIndex: number, previousPageData: Movie[]) => {
    if ((previousPageData && !previousPageData.length) || !query) return null; // reached the end
    return `https://api.themoviedb.org/3/search/movie?${qs.stringify({
      query,
      page: pageIndex + 1,
    })}`;
  };

  const { data, setSize, isLoading, isValidating } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
    revalidateFirstPage: false,
    revalidateOnFocus: false,
  });
  const movies = React.useMemo(() => data?.flatMap((el) => el) || [], [data]);

  return {
    movies,
    isLoading,
    isValidating,
    setPage: setSize,
  };
}
