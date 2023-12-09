import * as React from "react";

import fetchMovieDetail from "@/apis/fetchMovieDetail";
import fetchMovieCredits from "@/apis/fetchMovieCredits";
import fetchMovieReviews from "@/apis/fetchMovieReviews";

import Container from "@/components/Container";
import MovieDetail from '@/components/MovieDetail'
import MovieCasts from '@/components/MovieCasts'

import styles from "./page.module.css";

type Params = { params: { movieId: string } }

export default async function Movie({ params: { movieId } }: Params) {
  const detail = await fetchMovieDetail(movieId);
  const credits = await fetchMovieCredits(movieId);
  const reviews = await fetchMovieReviews(movieId);
  const directors = credits.crew.filter((member) => member.job === "Director");
  const writers = credits.crew.filter((member) => member.job === "Writer");
  
  return (
    <>
      <MovieDetail movie={detail} directors={directors} writers={writers} />
      <div className={styles.scetion}>
        <Container>
          <MovieCasts casts={credits.cast} />
        </Container>
      </div>
    </>
  );
}
