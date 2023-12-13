import * as React from "react";

import { SORT_BY } from "@/interfaces/utils";

import classNames from "classnames/bind";
import styles from "./SelectSortBy.module.css";

const cx = classNames.bind(styles);

export interface SortSelectProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectSortBy = (props: SortSelectProps) => {
  const { className, onChange, ...other } = props;

  return (
    <div className={cx("root", className)} {...other}>
      Sort By:
      <select onChange={onChange}>
        <option value={SORT_BY.DATE_ADDED}>Date Added</option>
        <option value={SORT_BY.POPULARITY}>Popularity</option>
        <option value={SORT_BY.RELEASE_DATE}>Release Date</option>
      </select>
    </div>
  );
};
