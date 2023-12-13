import React from "react";

import cx from "classnames";
import styles from "./Grid.module.css";

export interface GridProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  container?: boolean;
}

export const Grid = (props: GridProps) => {
  const { className, container, ...other } = props;
  return (
    <div
      className={cx(className, {
        [styles.item]: !container,
        [styles.container]: container,
      })}
      {...other}
    />
  );
};
