"use client";

import { convertFileToUrl, getFileType } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Preview from "./Preview";
import Image from "next/image";

const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement>,
    filename: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== filename));
  };

  const handleRemoveAllFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFiles([]);
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button className="bg-black hover:text-black hover:border-2 hover:bg-white transition-all duration-500 flex gap-2 items-center text-white md:px-4 px-2 py-2 rounded-3xl text-xs border-2">
        <Upload className="w-4 h-4 group-hover:invert" />
        Upload
      </button>
      {files.length > 0 && (
        <ul className="right-5 top-5 absolute mt-5 border-2 px-4 py-2 rounded-lg shadow-lg bg-white z-[9999]">
          <div className="flex justify-between items-center">
            <h4 className="h4 text-gray-600 text-sm">Uploading...</h4>
            <button
              className="px-2 py-1 border-2 rounded-xl text-xs hover:text-white hover:bg-black hover:scale-110 transition duration-500"
              onClick={(e) => handleRemoveAllFiles(e)}
            >
              Delete all
            </button>
          </div>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="text-xs text-gray-400 flex gap-2 items-center"
              >
                <Preview
                  type={type}
                  extension={extension}
                  url={convertFileToUrl(file)}
                />
                <div>
                  <p>{file.name}</p>
                  <Image
                    src="/icons/file-loader.gif"
                    alt="file-loader"
                    width={90}
                    height={50}
                  />
                </div>
                <Image
                  src="/icons/close.svg"
                  alt="remove"
                  width={20}
                  height={20}
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  className="cursor-pointer"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Uploader;
