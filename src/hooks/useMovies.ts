import client from "@/apis/client";
import { ListResponse, Movie } from "@/interfaces/entities";
import qs from "query-string";
import * as React from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: string) => client<ListResponse<Movie>>(url).then((res) => res.results);

export type UseMoviesMode = "popular" | "search";

export default function useMovies(mode: UseMoviesMode, query?: string) {
  const getKey = (pageIndex: number, previousPageData: Movie[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    if (mode === "popular") {
      return `https://api.themoviedb.org/3/movie/popular?${qs.stringify({ page: pageIndex + 1 })}`;
    }
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
