"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { useDebounce } from "use-debounce";
import Preview from "./Preview";
import FormattedDateTime from "./FormattedDateTime";
import Image from "next/image";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [files, setFiles] = useState<Models.Document[]>([]);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setFiles([]);
        setIsModalOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setFiles(files.documents);
      setIsModalOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setIsModalOpen(false);
    setFiles([]);

    router.push(
      `/${file.type === "audio" ? "audio" : file.type + "s"}?query=${query}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && files.length > 0) {
      handleClickItem(files[0]);
    }
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {isModalOpen && (
          <ul className="search-result">
            {files.length > 0 ? (
              files.map((file) => (
                <li
                  className="flex items-center justify-between gap-2"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-3">
                    <Preview
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-7 min-w-7"
                    />
                    <p className="text-[14px] leading-[20px] font-semibold text-gray-500">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="text-[12px] font-normal line-clamp-1 text-gray-700"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
