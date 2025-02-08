import Image from "next/image";
import React from "react";

const FileRoute = ({ name }: { name: string;}) => {
  return <div className="w-full flex justify-between hover:bg-gray-50 hover:scale-105 rounded-lg p-2 border-b-2 mb-4 transition duration-500">
    {name}
    <Image 
        src="/icons/chevron-right.svg"
        alt="chevron-right"
        width={20}
        height={20}
    />
  </div>;
};

export default FileRoute;
