"use client";

import * as React from "react";

import { useSearchParams } from "next/navigation";
import useMovieSearch from "@/hooks/useMovieSearch";

import Container from "../Container";
import MovieSimpleCard from "../MovieSimpleCard";
import Grid from "../Grid";
import Skeleton from "../Skeleton";

export interface SearchListProps {
  children?: React.ReactNode;
}

export const SearchList = ({ children }: SearchListProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useMovieSearch(query, page);

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
    if (data) {
      return (
        <Grid container>
          {data.results.map((el) => (
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
    return children;
  };

  return <Container>{renderList()}</Container>;
};
