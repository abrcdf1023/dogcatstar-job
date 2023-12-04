import * as React from "react";

import cx from "classnames";
import styles from "./Typography.module.css";

export interface TypographyProps {
  className?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  component?: React.ElementType;
  style?: React.CSSProperties;
}

const Typography = (props: React.PropsWithChildren<TypographyProps>) => {
  const {
    className,
    component = "p",
    fontSize = "14px",
    fontWeight,
    color,
    style,
    ...other
  } = props;

  const Component = component;

  return (
    <Component
      className={cx(styles.root, className)}
      style={{
        "--font-size": fontSize,
        "--font-weight": fontWeight,
        "--color": color,
        ...style,
      }}
      {...other}
    />
  );
};

export default Typography;
