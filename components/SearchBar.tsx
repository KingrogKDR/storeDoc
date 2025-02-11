import Image from "next/image";
import React from "react";

const SearchBar = () => {
  return (
    <div className="max-lg:w-full w-80 border-2 border-gray-400 rounded-3xl relative text-sm lg:text-base mb-5 flex hover:scale-105 hover:shadow-lg transition duration-500">
      <input
        type="text"
        className="w-full  rounded-3xl px-4 py-2 focus:border-black"
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute right-2 top-3 size-3 lg:size-4 hover:scale-150 transition duration-500 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
