import * as React from "react";

import fetchPopularList from "@/apis/fetchPopularList";

import Container from "@/components/common/Container";
import MovieSimpleCard from "@/components/MovieSimpleCard";
import Grid from "@/components/common/Grid";

export default async function Home() {
  const data = await fetchPopularList();

  return (
    <Container style={{ paddingTop: 24 }}>
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
    </Container>
  );
}
