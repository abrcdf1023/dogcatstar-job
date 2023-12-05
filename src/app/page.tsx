import * as React from "react";

import fetchPopularList from "@/apis/fetchPopularList";

import Layout from "@/components/Layout";
import MoveCard from "@/components/MoveCard";
import Grid from "@/components/Grid";

export default async function Home() {
  const data = await fetchPopularList();

  return (
    <Layout>
      {data.results.map((el) => (
        <Grid key={el.id}>
          <MoveCard
            title={el.title}
            posterPath={el.poster_path}
            releaseDate={el.release_date}
          />
        </Grid>
      ))}
    </Layout>
  );
}
