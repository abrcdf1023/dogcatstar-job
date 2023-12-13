"use client";

import * as React from "react";

import { PendingWatchMovie } from "@/interfaces/entities";
import { SORT_BY } from "@/interfaces/utils";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";
import sortByNumber from "@/utils/sortByNumber";
import SelectSortBy, { useSortBy } from "@/components/SelectSortBy";
import ButtonOrderBy, { useOrderBy } from "@/components/ButtonOrderBy";

import Container from "@/components/Container";
import ModalWatchLottery from "@/components/ModalWatchLottery";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";

import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function Watchlist() {
  const [watchlist, setWatchList] = useLocalStorage<PendingWatchMovie[]>(WATCH_LIST_KEY, []);

  const { sortBy, handleSortBy } = useSortBy();
  const { isAsc, handleOrderBy } = useOrderBy();

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

  const handleDelete: MovieCardProps["onDelete"] = (el) => {
    if (el) {
      setWatchList((v) => v.filter((m) => m.id !== el.id));
    }
  };

  return (
    <div className={cx("root")}>
      <Container>
        <div className={cx("actions")}>
          <SelectSortBy onChange={handleSortBy} />
          <ButtonOrderBy onClick={handleOrderBy} />
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
