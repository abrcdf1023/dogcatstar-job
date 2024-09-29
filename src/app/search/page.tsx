import SearchList from "@/components/search/SearchList";
import { Suspense } from "react";

export default function Search() {
  return (
    <Suspense>
      <SearchList />
    </Suspense>
  );
}
