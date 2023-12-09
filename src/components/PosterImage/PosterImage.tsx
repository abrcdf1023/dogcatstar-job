"use client";

import React from "react";

import Image, { ImageProps } from "next/image";
import shimmer from "@/utils/shimmer";
import toBase64 from "@/utils/toBase64";
import getImageUrl from "@/utils/getImageUrl";
import notfoundImage from "./image-not-found.jpg";

export interface PosterImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  width?: number;
  height?: number;
}

const PosterImage = (props: PosterImageProps) => {
  const { src, alt, width = 220, height = 330, ...other } = props;
  const [error, setError] = React.useState(!src);

  const handleError = () => {
    setError(true);
  };
  
  return (
    <Image
      loading="lazy"
      src={
        (error || !src)
          ? notfoundImage
          : getImageUrl(src, width, height)
      }
      width={width}
      height={height}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(220, 330))}`}
      onError={handleError}
      alt={alt}
      {...other}
    />
  );
};

export default PosterImage;
