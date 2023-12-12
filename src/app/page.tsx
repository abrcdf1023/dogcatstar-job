import * as React from "react";

import fetchPopularList from "@/apis/fetchPopularList";

import Container from "@/components/Container";
import SWRProvider from "@/components/SWRProvider";

import MovieSimpleCard from "@/components/MovieSimpleCard";
import Grid from "@/components/Grid";

import styles from "./page-home.module.css";

export default async function Home() {
  const data = await fetchPopularList();

  return (
    <SWRProvider>
      <Container className={styles.container}>
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
    </SWRProvider>
  );
}
