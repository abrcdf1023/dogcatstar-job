import * as React from "react";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

export interface ButtonProps extends ButtonBaseProps {
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { className, fullWidth, style, ...other } = props;

  return (
    /**
     * TODO: Remove div wrapper when next.js fix dynamic import order.
     * Css module cause wrong import order due to next.js dynamic import.
     * https://github.com/vercel/next.js/issues/16630
     *
     * Or consider to use styled-components.
     */
    <div className={cx("root", fullWidth && "fullWidth")} style={style}>
      <ButtonBase className={cx("btn")} {...other} />
    </div>
  );
};
