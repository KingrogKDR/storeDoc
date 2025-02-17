"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const IconWithTooltip = ({
  href,
  label,
  imageUrl,
}: {
  href: string;
  label: string;
  imageUrl: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative">
      {hovered && (
        <div className="absolute -top-2 right-0 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-md transition duration-300">
          {label}
        </div>
      )}
      <Link
        href={href}
        className="p-2 rounded active:opacity-35"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={imageUrl} alt={label} width={24} height={24} className="size-4"/>
      </Link>
    </div>
  );
};

export default IconWithTooltip;
