import * as React from "react";
import { SORT_BY } from "@/interfaces/utils";

export function useSortBy() {
  const [sortBy, setSortBy] = React.useState(SORT_BY.DATE_ADDED);
  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SORT_BY);
  };

  return { sortBy, handleSortBy };
}
