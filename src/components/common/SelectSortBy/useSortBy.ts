import * as React from "react";

export function useSortBy<S>(defaultSortBy: S) {
  const [sortBy, setSortBy] = React.useState<S>(defaultSortBy);

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as S);
  };

  return { sortBy, handleSortBy };
}
