import fetchPopularList from "@/apis/fetchPopularList";
import Grid from "@/components/common/Grid";
import MovieSimpleCard from "@/components/common/MovieSimpleCard";

export default async function Home() {
  const data = await fetchPopularList();

  return (
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
  );
}
