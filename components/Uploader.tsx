"use client";

import { convertFileToUrl, formatFileSize, getFileType } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Preview from "./Preview";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const Uploader = ({
  ownerId,
  accountId,
}: {
  ownerId: string;
  accountId: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast({
            description: (
              <div className="body-2 text-white">
                <p className="text-white text-base font-bold">
                  File Size exceeded !
                </p>
                <span className="font-semibold">{file.name}</span> is too large.
                <p>File Size: {`${formatFileSize(file.size)}MB `}</p>
                Max File size is {`${formatFileSize(MAX_FILE_SIZE)}`}MB.
              </div>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }

            toast({
              description: (
                <div className="body-1 text-white">
                  <p className="text-white">
                    File <span className="font-semibold">{uploadedFile.name}</span> uploaded Successfully !
                  </p>
                </div>
              ),
              className: "success-toast",
            });
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );

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
                    src="/images/file-loader.gif"
                    alt="file-loader"
                    width={90}
                    height={50}
                    className="unoptimized width:auto height:auto"
                  />
                </div>
                <Image
                  src="/icons/remove.svg"
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
