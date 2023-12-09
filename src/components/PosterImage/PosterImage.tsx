'use client'

import React from "react";

import Image, { ImageProps } from "next/image";
import shimmer from "@/utils/shimmer";
import toBase64 from "@/utils/toBase64";
import notfoundImage from "./image-not-found.jpg";

export interface PosterImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
}

const PosterImage = (props: PosterImageProps) => {
  const { src, alt, ...other } = props;
  const [error, setError] = React.useState(!src);

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      loading="lazy"
      src={
        error
          ? notfoundImage
          : `https://www.themoviedb.org/t/p/w220_and_h330_face${src}`
      }
      width={220}
      height={330}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(220, 330))}`}
      onError={handleError}
      alt={alt}
      {...other}
    />
  );
};

export default PosterImage;
