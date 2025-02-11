import React from "react";
import SearchBar from "./SearchBar";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "./Card";

const FileDisplaySection = async () => {
  const files = await getFiles();

  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <div className="md:w-2/3 flex justify-between gap-3">
          <SearchBar />
        </div>
        <div>
          {/* //TODO: section Containing Filters, sort, size occupied   */}
        </div>
      </div>
      <div>
        {files.total > 0 ? (
          <section>
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
