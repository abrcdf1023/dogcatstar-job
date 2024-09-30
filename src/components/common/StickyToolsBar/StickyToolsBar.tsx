import ButtonOrderBy, { ButtonOrderByProps } from "../ButtonOrderBy";
import Container from "../Container";
import SelectSortBy, { SelectSortByProps } from "../SelectSortBy";

import styles from "./StickyToolsBar.module.css";
import { MOVIE_SORT_BY } from "./useSortedMovies";

export interface StickyToolsBarProps {
  onSortByChange?: SelectSortByProps["onChange"];
  sortBy?: SelectSortByProps["value"];
  onOrderByClick?: ButtonOrderByProps["onClick"];
  isAsc?: boolean;
}

const StickyToolsBar = (props: StickyToolsBarProps) => {
  const { onSortByChange, sortBy, onOrderByClick, isAsc } = props;
  return (
    <div className={styles["tools-bar"]}>
      <Container className={styles["container"]}>
        <SelectSortBy
          onChange={onSortByChange}
          value={sortBy}
          options={[
            {
              value: MOVIE_SORT_BY.RELEASE_DATE,
              label: "Release Date",
            },
            {
              value: MOVIE_SORT_BY.VOTE_AVERAGE,
              label: "Vote Average",
            },
            {
              value: MOVIE_SORT_BY.POPULARITY,
              label: "Popularity",
            },
          ]}
        />
        <ButtonOrderBy onClick={onOrderByClick} isAsc={isAsc} />
      </Container>
    </div>
  );
};

export default StickyToolsBar;
