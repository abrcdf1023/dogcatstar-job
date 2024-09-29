"use client";

import ButtonOrderBy from "@/components/common/ButtonOrderBy";
import Container from "@/components/common/Container";
import SelectSortBy from "@/components/common/SelectSortBy";
import ModalWatchLottery from "@/components/watchlist/ModalWatchLottery";
import MovieCard, { MovieCardProps } from "@/components/watchlist/MovieCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { WATCH_LIST_SORT_BY, useSortedWatchList } from "@/hooks/useSortedWatchList";
import { PendingWatchMovie } from "@/interfaces/entities";
import { WATCH_LIST_KEY } from "@/utils/localStorageKeys";
import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function WatchList() {
  const [watchList, setWatchList] = useLocalStorage<PendingWatchMovie[]>(WATCH_LIST_KEY, []);
  const {
    sortedWatchList: sortedWatchList,
    handleSortBy,
    handleOrderBy,
    sortBy,
    isAsc,
  } = useSortedWatchList(watchList);

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
            value={sortBy}
            options={[
              {
                value: WATCH_LIST_SORT_BY.DATE_ADDED,
                label: "Date Added",
              },
              {
                value: WATCH_LIST_SORT_BY.POPULARITY,
                label: "Popularity",
              },
              {
                value: WATCH_LIST_SORT_BY.RELEASE_DATE,
                label: "Release Date",
              },
            ]}
          />
          <ButtonOrderBy onClick={handleOrderBy} isAsc={isAsc} />
          <div style={{ flexGrow: 1 }} />
          <ModalWatchLottery watchlist={watchList} />
        </div>
        <div className={cx("list")}>
          {sortedWatchList?.map((el) => <MovieCard key={el.id} movie={el} onDelete={handleDelete} />)}
        </div>
      </Container>
    </div>
  );
}
