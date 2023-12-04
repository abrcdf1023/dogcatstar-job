import * as React from "react";

import fetchPopularList from "@/apis/fetchPopularList";

import MoveCard from "@/components/MoveCard";
import Grid from "@/components/Grid";

export default async function Home() {
  const data = await fetchPopularList();

  return (
    <Grid container>
      {data.results.map((el) => (
        <Grid key={el.id}>
          <MoveCard
            title={el.title}
            posterPath={el.poster_path}
            releaseDate={el.release_date}
          />
        </Grid>
      ))}
    </Grid>
  );
}
