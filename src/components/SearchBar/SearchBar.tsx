"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import ButtonBase from "../common/ButtonBase";

import classNames from "classnames/bind";
import styles from "./SearchBar.module.css";

const cx = classNames.bind(styles);

export interface SearchBarProps extends React.ComponentPropsWithoutRef<"input"> {}

export const SearchBar = (props: SearchBarProps) => {
  const { onSubmit, ...other } = props;
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("query")) {
      push(`/search?q=${formData.get("query")}`);
    }
  };

  return (
    <form className={cx("root")} onSubmit={handleSubmit}>
      <input className={cx("input")} placeholder="Search Movies" name="query" defaultValue={query} {...other} />
      <ButtonBase className={cx("icon")} type="submit" />
    </form>
  );
};
