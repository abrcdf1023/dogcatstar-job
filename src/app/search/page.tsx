import * as React from "react";

import fetchSearchMovies from "@/apis/fetchSearchMovies";

import Container from "@/components/Container";
import SearchList from "@/components/SearchList";
import MovieSimpleCard from "@/components/MovieSimpleCard";
import Grid from "@/components/Grid";

type Params = { searchParams: { q: string } };

export default async function Search({ searchParams: { q } }: Params) {
  const data = await fetchSearchMovies(q, 1);

  return (
    <Container style={{ paddingTop: 24 }}>
      <SearchList>
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
      </SearchList>
    </Container>
  );
}
