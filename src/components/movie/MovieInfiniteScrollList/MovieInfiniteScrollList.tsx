"use client";

import StickyToolsBar from "@/components/common/StickyToolsBar/StickyToolsBar";
import { useSortedMovies } from "@/components/common/StickyToolsBar/useSortedMovies";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useMovies, { UseMoviesArgs, UseMoviesMode } from "@/hooks/useMovies";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import Container from "../../common/Container";
import Grid from "../../common/Grid";
import MovieSimpleCard from "../../common/MovieSimpleCard";
import Typography from "../../common/Typography";

export interface MovieInfiniteScrollListProps {
  mode: UseMoviesMode;
  emptyPlaceholder?: string;
  fallbackData?: UseMoviesArgs["fallbackData"];
}

export const MovieInfiniteScrollList = (props: MovieInfiniteScrollListProps) => {
  const { mode, emptyPlaceholder = "Movies empty.", fallbackData } = props;
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { setPage, movies, isLoading, isValidating } = useMovies({
    mode,
    query,
    fallbackData,
  });
  const { sortedMovies, handleOrderBy, handleSortBy, isAsc, sortBy } = useSortedMovies(movies);

  const [setElement, isVisible] = useIntersectionObserver();

  React.useEffect(() => {
    if (isVisible && !isLoading && !isValidating) {
      setPage((p) => p + 1);
    }
  }, [isVisible]);

  const renderList = () => {
    if (sortedMovies.length > 0) {
      return (
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
      );
    }
    if (sortedMovies.length === 0) {
      return <Typography fontSize={24}>{emptyPlaceholder}</Typography>;
    }
  };

  return (
    <>
      <StickyToolsBar onSortByChange={handleSortBy} onOrderByClick={handleOrderBy} sortBy={sortBy} isAsc={isAsc} />
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
