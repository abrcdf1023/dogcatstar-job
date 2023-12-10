import * as React from "react";

import className from "classnames/bind";
import styles from "./Container.module.css";
const cx = className.bind(styles);

export interface ContainerProps {
  className?: string;
}

export const Container = (props: React.PropsWithChildren<ContainerProps>) => {
  const { className, ...other } = props;
  return <div className={cx("root", className)} {...other} />;
};
