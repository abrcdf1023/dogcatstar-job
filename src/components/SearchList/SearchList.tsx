"use client";

import * as React from "react";

import { useSearchParams } from "next/navigation";
import useMovieSearch from "@/hooks/useMovieSearch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";

import Container from "../Container";
import Typography from "../Typography";
import MovieSimpleCard from "../MovieSimpleCard";
import Grid from "../Grid";
import Skeleton from "../Skeleton";
import SelectSortBy, { useSortBy } from "../SelectSortBy";
import ButtonOrderBy, { useOrderBy } from "../ButtonOrderBy";

enum SORT_BY {
  RELEASE_DATE = "RELEASE_DATE",
  POPULARITY = "POPULARITY",
}

export const SearchList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const triggeRef = React.useRef<HTMLDivElement>(null);
  const { setPage, movies: moviesData, isLoading, isValidating } = useMovieSearch(query);
  const { sortBy, handleSortBy } = useSortBy(SORT_BY.RELEASE_DATE);
  const { isAsc, handleOrderBy } = useOrderBy();

  const entry = useIntersectionObserver(triggeRef);
  const isVisible = !!entry?.isIntersecting;

  const movies = React.useMemo(() => {
    switch (sortBy) {
      case SORT_BY.POPULARITY:
        return moviesData.sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
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
    if (isLoading) {
      return (
        <Grid container>
          {Array.from({ length: 20 }, (_, i) => (
            <Grid key={i}>
              <Skeleton width={220} height={330} />
            </Grid>
          ))}
        </Grid>
      );
    }
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
              />
            </Grid>
          ))}
        </Grid>
      );
    }
    if (movies.length === 0) {
      return <Typography fontSize={24}>There are no movies that matched your query.</Typography>;
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", gap: 8 }}>
        <SelectSortBy
          onChange={handleSortBy}
          options={[
            {
              value: SORT_BY.RELEASE_DATE,
              label: "Release Date",
            },
            {
              value: SORT_BY.POPULARITY,
              label: "Popularity",
            },
          ]}
        />
        <ButtonOrderBy onClick={handleOrderBy} isAsc={isAsc} />
      </div>
      {renderList()}
      {isValidating && (
        <Typography fontSize={24} align="center">
          Loading...
        </Typography>
      )}
      <div ref={triggeRef} style={{ height: 10 }} />
    </Container>
  );
};
