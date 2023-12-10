import * as React from "react";

import classNames from "classnames/bind";
import styles from "./Card.module.css";
const cx = classNames.bind(styles);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
}

export const Card = (props: CardProps) => {
  const { className, direction = "column", ...other } = props;

  return (
    <div
      className={cx(
        "root",
        {
          row: direction === "row",
        },
        className,
      )}
      {...other}
    />
  );
};
