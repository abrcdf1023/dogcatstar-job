import fetchPopularList from "@/apis/fetchPopularList";

import MovieInfiniteScrollList from "@/components/movie/MovieInfiniteScrollList";
import { Suspense } from "react";

export default async function Home() {
  const data = await fetchPopularList();

  return (
    <Suspense>
      <MovieInfiniteScrollList mode="popular" fallbackData={[data.results]} />
    </Suspense>
  );
}
