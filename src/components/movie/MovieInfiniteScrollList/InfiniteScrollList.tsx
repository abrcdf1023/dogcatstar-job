"use client";

import Grid from "@/components/common/Grid";
import MovieSimpleCard from "@/components/common/MovieSimpleCard";
import { SelectSortByProps } from "@/components/common/SelectSortBy";
import Typography from "@/components/common/Typography";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useMovies, { UseMoviesArgs, UseMoviesMode } from "@/hooks/useMovies";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";
import { useSearchParams } from "next/navigation";
import React from "react";
import { MOVIE_SORT_BY } from "./MovieInfiniteScrollList";

export interface InfiniteScrollListProps {
  mode: UseMoviesMode;
  emptyPlaceholder?: string;
  fallbackData?: UseMoviesArgs["fallbackData"];
  sortBy?: SelectSortByProps["value"];
  isAsc?: boolean;
}

export const InfiniteScrollList = (props: InfiniteScrollListProps) => {
  const { mode, emptyPlaceholder = "Movies empty.", fallbackData, sortBy, isAsc } = props;
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { setPage, movies, isLoading, isValidating } = useMovies({
    mode,
    query,
    fallbackData,
  });
  const [setElement, isVisible] = useIntersectionObserver();

  React.useEffect(() => {
    if (isVisible && !isLoading && !isValidating) {
      setPage((p) => p + 1);
    }
  }, [isVisible]);

  const sortedMovies = React.useMemo(() => {
    switch (sortBy) {
      case MOVIE_SORT_BY.POPULARITY:
        return [...movies].sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
      case MOVIE_SORT_BY.VOTE_AVERAGE:
        return [...movies].sort((a, b) => numberCompare(a.vote_average, b.vote_average, isAsc));
      case MOVIE_SORT_BY.RELEASE_DATE:
        return [...movies].sort((a, b) =>
          numberCompare(getTimestamp(a?.release_date), getTimestamp(b?.release_date), isAsc),
        );
      default:
        return movies;
    }
  }, [movies, sortBy, isAsc]);

  if (!sortedMovies) return;
  if (sortedMovies.length === 0) {
    return <Typography fontSize={24}>{emptyPlaceholder}</Typography>;
  }
  return (
    <>
      <Grid container>
        {sortedMovies.map((el) => (
          <Grid key={el.id}>
            <MovieSimpleCard
              href={`/movie/${el.id}`}
              title={el.title}
              posterPath={el.poster_path}
              releaseDate={el.release_date}
              popularity={el.popularity}
              voteAverage={el.vote_average}
            />
          </Grid>
        ))}
      </Grid>
      {isValidating && (
        <Typography fontSize={24} align="center">
          Loading...
        </Typography>
      )}
      <div ref={setElement} style={{ height: 10 }} />
    </>
  );
};
