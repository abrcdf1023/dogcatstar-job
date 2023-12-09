import * as React from "react";

import fetchMovieDetail from "@/apis/fetchMovieDetail";
import fetchMovieCredits from "@/apis/fetchMovieCredits";
import fetchMovieReviews from "@/apis/fetchMovieReviews";

import Container from "@/components/Container";
import Typography from "@/components/Typography";
import MovieDetail from '@/components/MovieDetail'

type Params = { params: { movieId: string } }

export default async function Movie({ params: { movieId } }: Params) {
  const detail = await fetchMovieDetail(movieId);
  const credits = await fetchMovieCredits(movieId);
  const reviews = await fetchMovieReviews(movieId);
  const directors = credits.crew.filter((member) => member.job === "Director");
  const writers = credits.crew.filter((member) => member.job === "Writer");
  
  console.log(writers)
  return (
    <MovieDetail movie={detail} directors={directors} writers={writers} />
  );
}
