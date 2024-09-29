import MovieInfiniteScrollList from "@/components/movie/MovieInfiniteScrollList";
import { Suspense } from "react";

export default function Search() {
  return (
    <Suspense>
      <MovieInfiniteScrollList mode="search" />
    </Suspense>
  );
}
