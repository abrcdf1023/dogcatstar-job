"use client";

import * as React from "react";

import { useSearchParams } from "next/navigation";
import useMovieSearch from "@/hooks/useMovieSearch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import Container from "../Container";
import Typography from "../Typography";
import MovieSimpleCard from "../MovieSimpleCard";
import Grid from "../Grid";
import Skeleton from "../Skeleton";

export const SearchList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const triggeRef = React.useRef<HTMLDivElement>(null);
  const { setPage, movies, isLoading, isValidating } = useMovieSearch(query);

  const entry = useIntersectionObserver(triggeRef);
  const isVisible = !!entry?.isIntersecting;

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
      {renderList()}
      <div ref={triggeRef} style={{ height: 10 }} />
    </Container>
  );
};
