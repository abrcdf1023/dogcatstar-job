import fetchPopularList from "@/apis/fetchPopularList";

import MovieInfiniteScrollList from "@/components/movie/MovieInfiniteScrollList";
import SWRProvider from "@/components/providers/SWRProvider";
import { Suspense } from "react";

export default async function Home() {
  const data = await fetchPopularList();
  const fallback = {
    "https://api.themoviedb.org/3/movie/popular?page=1": data,
  };

  return (
    <SWRProvider value={{ fallback }}>
      <Suspense>
        <MovieInfiniteScrollList mode="popular" />
      </Suspense>
    </SWRProvider>
  );
}
