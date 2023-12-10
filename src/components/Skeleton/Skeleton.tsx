import * as React from "react";

import shimmer from "@/utils/shimmer";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

export const Skeleton = (props: SkeletonProps) => {
  const { width = 200, height = 100, ...other } = props;

  const svgHtml = React.useMemo(() => shimmer(width, height), [width, height]);

  return <div dangerouslySetInnerHTML={{ __html: svgHtml }} {...other} />;
};
