"use client";

import * as React from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useMovies, { UseMoviesArgs, UseMoviesMode } from "@/hooks/useMovies";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";
import { useSearchParams } from "next/navigation";
import ButtonOrderBy, { useOrderBy } from "../../common/ButtonOrderBy";
import Container from "../../common/Container";
import Grid from "../../common/Grid";
import MovieSimpleCard from "../../common/MovieSimpleCard";
import SelectSortBy, { useSortBy } from "../../common/SelectSortBy";
import Typography from "../../common/Typography";

import { useSWRConfig } from "swr";
import styles from "./MovieInfiniteScrollList.module.css";

enum SORT_BY {
  RELEASE_DATE = "RELEASE_DATE",
  POPULARITY = "POPULARITY",
  VOTE_AVERAGE = "VOTE_AVERAGE",
}

export interface MovieInfiniteScrollListProps {
  mode: UseMoviesMode;
  emptyPlaceholder?: string;
  fallbackData?: UseMoviesArgs["fallbackData"];
}

export const MovieInfiniteScrollList = (props: MovieInfiniteScrollListProps) => {
  const { mode, emptyPlaceholder = "Movies empty.", fallbackData } = props;
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { cache } = useSWRConfig();
  const {
    setPage,
    movies: moviesData,
    isLoading,
    isValidating,
  } = useMovies({
    mode,
    query,
    fallbackData,
  });
  const { sortBy, handleSortBy } = useSortBy(SORT_BY.RELEASE_DATE);
  const { isAsc, handleOrderBy } = useOrderBy();

  const [setElement, isVisible] = useIntersectionObserver();

  const movies = React.useMemo(() => {
    switch (sortBy) {
      case SORT_BY.POPULARITY:
        return moviesData.sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
      case SORT_BY.VOTE_AVERAGE:
        return moviesData.sort((a, b) => numberCompare(a.vote_average, b.vote_average, isAsc));
      default:
        return moviesData.sort((a, b) =>
          numberCompare(getTimestamp(a?.release_date), getTimestamp(b?.release_date), isAsc),
        );
    }
  }, [moviesData, sortBy, isAsc]);

  React.useEffect(() => {
    if (isVisible && !isLoading && !isValidating) {
      setPage((p) => p + 1);
    }
  }, [isVisible]);

  const renderList = () => {
    if (movies.length > 0) {
      return (
        <Grid container>
          {movies.map((el) => (
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
      );
    }
    if (movies.length === 0) {
      return <Typography fontSize={24}>{emptyPlaceholder}</Typography>;
    }
  };

  return (
    <>
      <div className={styles["tools-bar"]}>
        <Container className={styles["container"]}>
          <SelectSortBy
            onChange={handleSortBy}
            options={[
              {
                value: SORT_BY.RELEASE_DATE,
                label: "Release Date",
              },
              {
                value: SORT_BY.VOTE_AVERAGE,
                label: "Vote Average",
              },
              {
                value: SORT_BY.POPULARITY,
                label: "Popularity",
              },
            ]}
          />
          <ButtonOrderBy onClick={handleOrderBy} isAsc={isAsc} />
        </Container>
      </div>
      <Container style={{ paddingTop: 24 }}>
        {renderList()}
        {isValidating && (
          <Typography fontSize={24} align="center">
            Loading...
          </Typography>
        )}
        <div ref={setElement} style={{ height: 10 }} />
      </Container>
    </>
  );
};
