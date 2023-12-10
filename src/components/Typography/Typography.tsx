import * as React from "react";

import cx from "classnames";
import styles from "./Typography.module.css";

const parseToPx = (v: number | string) => typeof v === "number" ? `${v}px` : v

export interface TypographyProps {
  className?: string;
  fontSize?: number | string;
  fontWeight?: number;
  align?: "left" | "center" | "right";
  color?: string;
  component?: React.ElementType;
  style?: React.CSSProperties;
}

export const Typography = (props: React.PropsWithChildren<TypographyProps>) => {
  const {
    className,
    component = "p",
    fontSize = 14,
    fontWeight = 500,
    color = 'text-primary',
    align,
    style,
    ...other
  } = props;

  const Component = component;

  return (
    <Component
      className={cx(styles.root, className)}
      style={{
        "--font-size": parseToPx(fontSize),
        "--font-weight": fontWeight,
        "--color": `var(--${color})`,
        "--align": align,
        ...style,
      }}
      {...other}
    />
  );
};