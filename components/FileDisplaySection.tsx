import React from "react";
import { Models } from "node-appwrite";
import Card from "./Card";

const FileDisplaySection = async ({
  files,
}: {
  files: Models.DocumentList<Models.Document>;
}) => {
  return (
    <>
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
