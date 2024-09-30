import { tmdbClient } from "@/apis/client";
import { ListResponse, Movie } from "@/interfaces/entities";
import qs from "query-string";
import * as React from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: string) => tmdbClient<ListResponse<Movie>>(url).then((res) => res.results);

export type UseMoviesMode = "popular" | "search";

export type UseMoviesArgs = {
  mode: UseMoviesMode;
  fallbackData?: Movie[][];
  query?: string;
};

export default function useMovies(args: UseMoviesArgs) {
  const { mode, fallbackData, query } = args;
  const getKey = (pageIndex: number, previousPageData: Movie[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    if (mode === "popular") {
      return `/movie/popular?${qs.stringify({ page: pageIndex + 1 })}`;
    }
    return `/search/movie?${qs.stringify({
      query,
      page: pageIndex + 1,
    })}`;
  };

  const { data, setSize, isLoading, isValidating, size } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    fallbackData,
  });
  const movies = React.useMemo(() => {
    if (!data) return [];
    const seen = new Set<Movie["id"]>();
    return data.flat().filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [data]);

  return {
    movies,
    isLoading,
    isValidating,
    page: size,
    setPage: setSize,
  };
}
