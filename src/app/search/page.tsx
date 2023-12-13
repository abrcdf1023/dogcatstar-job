import * as React from "react";

import Container from "@/components/Container";
import SearchList from "@/components/SearchList";

export default async function Search() {
  return (
    <Container style={{ paddingTop: 24 }}>
      <SearchList />
    </Container>
  );
}
