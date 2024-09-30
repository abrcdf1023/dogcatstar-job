"use client";

import { useOrderBy } from "@/components/common/ButtonOrderBy";
import { useSortBy } from "@/components/common/SelectSortBy";
import StickyToolsBar from "@/components/common/StickyToolsBar/StickyToolsBar";
import { UseMoviesArgs, UseMoviesMode } from "@/hooks/useMovies";
import { PropsWithChildren, Suspense } from "react";
import Container from "../../common/Container";
import { InfiniteScrollList, InfiniteScrollListProps } from "./InfiniteScrollList";

export enum MOVIE_SORT_BY {
  RELEASE_DATE = "RELEASE_DATE",
  POPULARITY = "POPULARITY",
  VOTE_AVERAGE = "VOTE_AVERAGE",
}

export interface MovieInfiniteScrollListProps {
  mode: UseMoviesMode;
  emptyPlaceholder?: InfiniteScrollListProps["emptyPlaceholder"];
  fallbackData?: UseMoviesArgs["fallbackData"];
}

export const MovieInfiniteScrollList = (props: PropsWithChildren<MovieInfiniteScrollListProps>) => {
  const { mode, emptyPlaceholder, fallbackData, children } = props;
  const { sortBy, handleSortBy } = useSortBy<MOVIE_SORT_BY>();
  const { isAsc, handleOrderBy } = useOrderBy();

  return (
    <>
      <StickyToolsBar onSortByChange={handleSortBy} onOrderByClick={handleOrderBy} sortBy={sortBy} isAsc={isAsc} />
      <Container style={{ paddingTop: 24 }}>
        {children}
        <Suspense>
          <InfiniteScrollList
            mode={mode}
            emptyPlaceholder={emptyPlaceholder}
            fallbackData={fallbackData}
            sortBy={sortBy}
            isAsc={isAsc}
          />
        </Suspense>
      </Container>
    </>
  );
};
