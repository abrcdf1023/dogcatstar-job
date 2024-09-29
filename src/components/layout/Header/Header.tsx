import Link from "next/link";
import SearchBar from "../SearchBar";

import className from "classnames/bind";
import { Suspense } from "react";
import styles from "./Header.module.css";

const cx = className.bind(styles);

export const Header = () => {
  return (
    <header className={cx("root")}>
      <div className={cx("content")}>
        <Link href="/" className={cx("logo")}>
          Home
        </Link>
        <Suspense>
          <SearchBar />
        </Suspense>
        <Link href="/watchlist">Watch List</Link>
      </div>
    </header>
  );
};
