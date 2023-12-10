import * as React from "react";

import { Movie } from "@/interfaces/entities";

import Image from "../Image";
import Typography from "../Typography";
import Card from "../Card";
import Button, { ButtonProps } from "../Button";

import className from "classnames/bind";
import styles from "./MovieCard.module.css";
const cx = className.bind(styles);

export interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  movie?: Movie;
  onDelete?: (el?: Movie) => void;
}

export const MovieCard = (props: MovieCardProps) => {
  const { className, movie, onDelete, ...other } = props;

  const handleClick =
    (movie?: Movie): ButtonProps["onClick"] =>
    (e) => {
      onDelete?.(movie);
    };

  return (
    <Card className={cx("root", className)} direction="row" {...other}>
      <Image width={150} height={225} path={movie?.poster_path} alt={movie?.title || ""} source="bestv2" />
      <div className={cx("card-body")}>
        <Typography component="h3" fontSize={24} fontWeight={700}>
          {movie?.title}
        </Typography>
        <Typography fontSize={12} color="text-secondary">
          {movie?.release_date}
        </Typography>
        <div className={cx("overview")}>
          <Typography>{movie?.overview}</Typography>
        </div>
        <div className={cx("info")}>
          <Typography fontSize={12} color="text-secondary">
            Popularity: {movie?.popularity}
          </Typography>
        </div>
        <Button fullWidth onClick={handleClick(movie)}>
          Remove
        </Button>
      </div>
    </Card>
  );
};
