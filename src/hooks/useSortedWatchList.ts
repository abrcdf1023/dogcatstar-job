import { useOrderBy } from "@/components/common/ButtonOrderBy";
import { useSortBy } from "@/components/common/SelectSortBy";
import { PendingWatchMovie } from "@/interfaces/entities";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";
import * as React from "react";

export enum WATCH_LIST_SORT_BY {
  DATE_ADDED = "DATE_ADDED",
  POPULARITY = "POPULARITY",
  RELEASE_DATE = "RELEASE_DATE",
}

export const useSortedWatchList = (watchList: PendingWatchMovie[]) => {
  const { sortBy, handleSortBy } = useSortBy<WATCH_LIST_SORT_BY>();
  const { isAsc, handleOrderBy } = useOrderBy();

  const sortedWatchList = React.useMemo(() => {
    switch (sortBy) {
      case WATCH_LIST_SORT_BY.DATE_ADDED:
        return [...watchList].sort((a, b) => numberCompare(a.timeAddedToWatch, b.timeAddedToWatch, isAsc));
      case WATCH_LIST_SORT_BY.POPULARITY:
        return [...watchList].sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
      case WATCH_LIST_SORT_BY.RELEASE_DATE:
        return [...watchList].sort((a, b) =>
          numberCompare(getTimestamp(a?.release_date), getTimestamp(b?.release_date), isAsc),
        );
      default:
        return watchList;
    }
  }, [watchList, sortBy, isAsc]);

  return { sortedWatchList, handleSortBy, handleOrderBy, isAsc, sortBy };
};
