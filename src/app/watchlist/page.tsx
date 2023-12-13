"use client";

import * as React from "react";

import { PendingWatchMovie } from "@/interfaces/entities";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";
import getTimestamp from "@/utils/getTimestamp";
import numberCompare from "@/utils/numberCompare";

import Container from "@/components/common/Container";
import SelectSortBy, { useSortBy } from "@/components/common/SelectSortBy";
import ButtonOrderBy, { useOrderBy } from "@/components/common/ButtonOrderBy";
import ModalWatchLottery from "@/components/watchlist/ModalWatchLottery";
import MovieCard, { MovieCardProps } from "@/components/watchlist/MovieCard";

import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

enum SORT_BY {
  DATE_ADDED = "DATE_ADDED",
  POPULARITY = "POPULARITY",
  RELEASE_DATE = "RELEASE_DATE",
}

export default function Watchlist() {
  const [watchlist, setWatchList] = useLocalStorage<PendingWatchMovie[]>(WATCH_LIST_KEY, []);

  const { sortBy, handleSortBy } = useSortBy(SORT_BY.DATE_ADDED);
  const { isAsc, handleOrderBy } = useOrderBy();

  const sortedWatchlist = React.useMemo(() => {
    switch (sortBy) {
      case SORT_BY.POPULARITY:
        return watchlist.sort((a, b) => numberCompare(a.popularity, b.popularity, isAsc));
      case SORT_BY.RELEASE_DATE:
        return watchlist.sort((a, b) =>
          numberCompare(getTimestamp(a?.release_date), getTimestamp(b?.release_date), isAsc),
        );
      default:
        return watchlist.sort((a, b) => numberCompare(a.timeAddedToWatch, b.timeAddedToWatch, isAsc));
    }
  }, [watchlist, sortBy, isAsc]);

  const handleDelete: MovieCardProps["onDelete"] = (el) => {
    if (el) {
      setWatchList((v) => v.filter((m) => m.id !== el.id));
    }
  };

  return (
    <div className={cx("root")}>
      <Container>
        <div className={cx("actions")}>
          <SelectSortBy
            onChange={handleSortBy}
            options={[
              {
                value: SORT_BY.DATE_ADDED,
                label: "Date Added",
              },
              {
                value: SORT_BY.POPULARITY,
                label: "Popularity",
              },
              {
                value: SORT_BY.RELEASE_DATE,
                label: "Release Date",
              },
            ]}
          />
          <ButtonOrderBy onClick={handleOrderBy} isAsc={isAsc} />
          <div style={{ flexGrow: 1 }} />
          <ModalWatchLottery watchlist={watchlist} />
        </div>
        <div className={cx("list")}>
          {sortedWatchlist?.map((el) => <MovieCard key={el.id} movie={el} onDelete={handleDelete} />)}
        </div>
      </Container>
    </div>
  );
}
