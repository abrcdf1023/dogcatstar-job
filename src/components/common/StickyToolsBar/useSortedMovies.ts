import { useOrderBy } from "@/components/common/ButtonOrderBy";
import { useSortBy } from "@/components/common/SelectSortBy";
import { Movie } from "@/interfaces/entities";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";
import * as React from "react";

export enum MOVIE_SORT_BY {
  RELEASE_DATE = "RELEASE_DATE",
  POPULARITY = "POPULARITY",
  VOTE_AVERAGE = "VOTE_AVERAGE",
}

export const useSortedMovies = (movies: Movie[]) => {
  const { sortBy, handleSortBy } = useSortBy<MOVIE_SORT_BY>();
  const { isAsc, handleOrderBy } = useOrderBy();
  const sortedMovies = React.useMemo(() => {
    switch (sortBy) {
      case MOVIE_SORT_BY.POPULARITY:
        return [...movies].sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
      case MOVIE_SORT_BY.VOTE_AVERAGE:
        return [...movies].sort((a, b) => numberCompare(a.vote_average, b.vote_average, isAsc));
      case MOVIE_SORT_BY.RELEASE_DATE:
        return [...movies].sort((a, b) =>
          numberCompare(getTimestamp(a?.release_date), getTimestamp(b?.release_date), isAsc),
        );
      default:
        return movies;
    }
  }, [movies, sortBy, isAsc]);

  return { sortedMovies, handleSortBy, handleOrderBy, isAsc, sortBy };
};
