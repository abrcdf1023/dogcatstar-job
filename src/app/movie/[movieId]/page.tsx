import * as React from "react";

import fetchMovieDetail from "@/apis/fetchMovieDetail";
import fetchMovieCredits from "@/apis/fetchMovieCredits";
import fetchMovieReviews from "@/apis/fetchMovieReviews";

import Container from "@/components/Container";
import Typography from "@/components/Typography";

type Params = { params: { movieId: string } }

export default async function Movie({ params: { movieId } }: Params) {
  const detail = await fetchMovieDetail(movieId);
  const credits = await fetchMovieCredits(movieId);
  const reviews = await fetchMovieReviews(movieId);
  const director = credits.crew.find((member) => member.job === "Director");
  console.log(JSON.stringify(reviews))
  return (
    <Container>
      <Typography component="h1">{detail.title}</Typography>
    </Container>
  );
}
