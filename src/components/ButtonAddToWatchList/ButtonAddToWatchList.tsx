"use client";

import * as React from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import { WATCH_LIST_KEY } from "@/utils/localStarageKeys";
import { Movie, PendingWatchMovie } from "@/interfaces/entities";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

import className from "classnames/bind";
import styles from "./ButtonAddToWatchList.module.css";
const cx = className.bind(styles);

export interface ButtonAddToWatchListProps extends ButtonBaseProps {
  movie?: Movie;
}

export const ButtonAddToWatchList = (props: ButtonAddToWatchListProps) => {
  const { className, movie, onClick, ...other } = props;
  const [watchlist, setWatchList] = useLocalStorage<PendingWatchMovie[]>(
    WATCH_LIST_KEY,
    []
  );
  const active =
    movie && watchlist.findIndex((el) => el.id === movie.id) !== -1;

  const handleAddToWatchList: ButtonAddToWatchListProps["onClick"] = (e) => {
    if (onClick) onClick(e);
    if (!movie) return;
    setWatchList((list) => {
      const movieIndex = list.findIndex((el) => el.id === movie.id);
      if (movieIndex === -1) {
        return [
          ...list,
          {
            ...movie,
            timeAddedToWatch: new Date().getTime(),
            releaseDateTime: movie.release_date
              ? new Date(movie.release_date).getTime()
              : undefined,
          } as PendingWatchMovie,
        ];
      }
      return list.filter((el) => el.id !== movie.id);
    });
  };

  return (
    <ButtonBase
      className={cx("root", active && "active", className)}
      onClick={handleAddToWatchList}
      {...other}
    />
  );
};
