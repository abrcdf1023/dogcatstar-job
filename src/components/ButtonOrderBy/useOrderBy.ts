import * as React from "react";

export const useOrderBy = () => {
  const [isAsc, setIsAsc] = React.useState(false);

  const handleOrderBy = () => {
    setIsAsc((v) => !v);
  };

  return { isAsc, handleOrderBy };
};
