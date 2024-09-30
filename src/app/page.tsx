import fetchPopularList from "@/apis/fetchPopularList";
import Grid from "@/components/common/Grid";
import MovieSimpleCard from "@/components/common/MovieSimpleCard";
import MovieInfiniteScrollList from "@/components/movie/MovieInfiniteScrollList";

export default async function Home() {
  const data = await fetchPopularList({ page: 1 });

  return (
    <MovieInfiniteScrollList mode="popular">
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
    </MovieInfiniteScrollList>
  );
}
