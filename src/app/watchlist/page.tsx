'use client'

import * as React from "react";

import { Movie } from "@/interfaces/entities";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";

import Container from "@/components/Container";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";

import classNames from "classnames/bind";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function Watchlist() {
  const [watchlist, setWatchList] = useLocalStorage<Movie[]>(WATCH_LIST_KEY, [])

  const handleDelete: MovieCardProps['onDelete'] = (el) => {
    if (el) {
      setWatchList(v => v.filter((m) => m.id !== el.id))
    }
  }
  
  return (
    <div className={cx('root')}>
      <Container>
        <div className={cx('list')}>
          {watchlist.map((el) => (<MovieCard key={el.id} movie={el} onDelete={handleDelete} />))}
        </div>
      </Container>
    </div>
  );
}
