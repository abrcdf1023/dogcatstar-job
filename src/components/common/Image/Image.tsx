"use client";

import * as React from "react";

import shimmer from "@/utils/shimmer";
import toBase64 from "@/utils/toBase64";
import getImageUrl, { Source } from "@/utils/getImageUrl";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import notfoundImage from "./image-not-found.jpg";

export interface ImageProps extends Omit<NextImageProps, "src"> {
  path?: string | null;
  width?: number;
  height?: number;
  source?: Source;
}

export const Image = (props: ImageProps) => {
  const { path, alt, width = 220, height = 330, source = "face", ...other } = props;
  const [error, setError] = React.useState(!path);

  const handleError = () => {
    setError(true);
  };

  return (
    <NextImage
      loading="lazy"
      src={error || !path ? notfoundImage : getImageUrl(path, width, height, source)}
      width={width}
      height={height}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(220, 330))}`}
      onError={handleError}
      alt={alt}
      {...other}
    />
  );
};
