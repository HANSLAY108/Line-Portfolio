"use client";

import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  className?: string;
  placeholderLabel?: string;
};

export default function MediaFrame({
  src,
  alt,
  className = "",
  placeholderLabel,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className={`object-cover transition-transform duration-500 ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <ImagePlaceholder label={placeholderLabel ?? alt} className={className} />
  );
}
