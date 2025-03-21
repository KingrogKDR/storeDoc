import { getFileIcon } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Preview = ({
  type,
  extension,
  url = "",
  className,
  imageClassName,
}: PreviewProps) => {
  const isImage = type === "image";

  return (
    <figure className={className}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="preview"
        width={100}
        height={100}
        className={`object-contain size-8 ${imageClassName}`}
      />
    </figure>
  );
};

export default Preview;
