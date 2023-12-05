import * as React from "react";

import fetchMovieDetail from "@/apis/fetchMovieDetail";

import Container from "@/components/Container";
import Typography from "@/components/Typography";

type Params = { params: { movieId: string } }

export default async function Movie({ params }: Params) {
  const data = await fetchMovieDetail(params.movieId);

  return (
    <Container>
      <Typography component="h1">{data.title}</Typography>
    </Container>
  );
}
