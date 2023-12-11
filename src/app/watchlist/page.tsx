"use client";

import * as React from "react";

import { PendingWatchMovie } from "@/interfaces/entities";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";
import sortByNumber from "@/utils/sortByNumber";

import Container from "@/components/Container";
import Button from "@/components/Button";
import ModalWatchLottery from "@/components/ModalWatchLottery";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";

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
  const [sortBy, setSortBy] = React.useState(SORT_BY.DATE_ADDED);
  const [isAsc, setIsAsc] = React.useState(false);

  const sortedWatchlist = React.useMemo(() => {
    switch (sortBy) {
      case SORT_BY.POPULARITY:
        return watchlist.sort((a, b) => sortByNumber(a.popularity, b.popularity, isAsc));
      case SORT_BY.RELEASE_DATE:
        return watchlist.sort((a, b) => sortByNumber(a.releaseDateTime, b.releaseDateTime, isAsc));
      default:
        return watchlist.sort((a, b) => sortByNumber(a.timeAddedToWatch, b.timeAddedToWatch, isAsc));
    }
  }, [watchlist, sortBy, isAsc]);

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SORT_BY);
  };

  const handleOrderBy = () => {
    setIsAsc((v) => !v);
  };

  const handleDelete: MovieCardProps["onDelete"] = (el) => {
    if (el) {
      setWatchList((v) => v.filter((m) => m.id !== el.id));
    }
  };

  return (
    <div className={cx("root")}>
      <Container>
        <div className={cx("actions")}>
          <div className={cx("action")}>
            Sort By:
            <select onChange={handleSortBy}>
              <option value={SORT_BY.DATE_ADDED}>Date Added</option>
              <option value={SORT_BY.POPULARITY}>Popularity</option>
              <option value={SORT_BY.RELEASE_DATE}>Release Date</option>
            </select>
          </div>
          <div className={cx("action")}>
            Order By:
            <Button onClick={handleOrderBy}>{isAsc ? "↑" : "↓"}</Button>
          </div>
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
