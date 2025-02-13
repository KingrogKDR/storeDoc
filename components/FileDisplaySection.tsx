import React from "react";
import SearchBar from "./SearchBar";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "./Card";
import Sort from "./Sort";

const FileDisplaySection = async () => {
  const files = await getFiles();
  return (
    <>
      <div className="flex gap-3 items-center justify-between px-4 py-2">
        <div className="lg:w-2/3">
          <p className="text-xs font-semibold text-gray-600 w-16">Size: 0MB</p>
        </div>
        <div className="center gap-3">
          <SearchBar />
          <div className="flex gap-2">
            <p className="body-1 hidden text-gray-600 sm:block">Sort by:</p>
              
            <Sort />
          </div>
          {/* //TODO: section Containing Filters, sort, size occupied   */}
        </div>
      </div>
      <div>
        {files.total > 0 ? (
          <section className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {files.documents.map((file: Models.Document) => (
              <Card key={file.$id} file={file} />
            ))}
          </section>
        ) : (
          <p className="text-center text-xs lg:text-sm text-gray-400">
            No files uploaded
          </p>
        )}
      </div>
    </>
  );
};

export default FileDisplaySection;
