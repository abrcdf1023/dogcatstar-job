import * as React from "react";

import Button from "@/components/common/Button";

import classNames from "classnames/bind";
import styles from "./ButtonOrderBy.module.css";

const cx = classNames.bind(styles);

export interface ButtonOrderByProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onClick"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAsc?: boolean;
}

export const ButtonOrderBy = (props: ButtonOrderByProps) => {
  const { className, onClick, isAsc, ...other } = props;

  return (
    <div className={cx("root", className)} {...other}>
      Order By:
      <Button onClick={onClick}>{isAsc ? "↑" : "↓"}</Button>
    </div>
  );
};
