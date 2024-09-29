import * as React from "react";

import classNames from "classnames/bind";
import styles from "./SelectSortBy.module.css";

const cx = classNames.bind(styles);

type Option = {
  value: string;
  label: string;
};

export interface SortSelectProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Option[];
  value?: string;
}

export const SelectSortBy = (props: SortSelectProps) => {
  const { className, onChange, options, value, ...other } = props;

  return (
    <div className={cx("root", className)} {...other}>
      Sort By:
      <select value={value} onChange={onChange}>
        <option value="">Select</option>
        {options?.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
    </div>
  );
};
