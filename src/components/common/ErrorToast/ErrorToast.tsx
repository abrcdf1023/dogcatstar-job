import * as React from "react";

import classNames from "classnames/bind";
import styles from "./ErrorToast.module.css";

const cx = classNames.bind(styles);

export const ErrorToast = () => {
  return <div className={cx("root")}>Network Error. Please try again later.</div>;
};
