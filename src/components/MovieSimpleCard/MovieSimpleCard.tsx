import * as React from "react";

import Link from "next/link";
import Card from "../Card";
import Typography from "../Typography";
import Image from "../Image";

import className from "classnames/bind";
import styles from "./MovieSimpleCard.module.css";
const cx = className.bind(styles);

export interface MoveCardProps {
  href: string;
  className?: string;
  title?: string;
  posterPath?: string | null;
  releaseDate?: string;
  popularity?: number;
  voteAverage?: number;
}

export const MovieSimpleCard = (props: MoveCardProps) => {
  const { className, title = "", posterPath, releaseDate, popularity, voteAverage, href } = props;

  return (
    <Card className={cx("root", className)}>
      <Link href={href}>
        <Image className={cx("img")} path={posterPath} alt={title} />
      </Link>
      <div className={cx("card-body")}>
        {!!title && <Typography fontWeight={700}>{title}</Typography>}
        {!!releaseDate && <Typography>Release: {releaseDate}</Typography>}
        {!!popularity && <Typography>Popularity: {popularity}</Typography>}
        {!!voteAverage && <Typography>Vote Average: {voteAverage}</Typography>}
      </div>
    </Card>
  );
};
