'use client'

import * as React from "react";

import { Movie } from "@/interfaces/entities";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";

import Container from "@/components/Container";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";

import styles from "./page.module.css";

export default function Watchlist() {
  const [watchlist, setWatchList] = useLocalStorage<Movie[]>(WATCH_LIST_KEY, [])

  const handleDelete: MovieCardProps['onDelete'] = (el) => {
    if (el) {
      setWatchList(v => v.filter((m) => m.id !== el.id))
    }
  }
  
  return (
    <Container className={styles.root}>
      {watchlist.map((el) => (<MovieCard key={el.id} movie={el} onDelete={handleDelete} />))}
    </Container>
  );
}
