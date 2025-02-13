import { Models } from "node-appwrite";
import React from "react";
import Preview from "./Preview";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { ShareFileProps } from "@/types";
import Image from "next/image";

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="mb-1 flex items-center gap-3 rounded-xl bg-white p-3">
      <p className="body-2 text-gray-500 w-[30%] text-left">{label}</p>
      <p className="text-[14px] leading-[20px] font-semibold flex-1 text-left">
        {value}
      </p>
    </div>
  );
};

const ImagePreview = ({ file }: { file: Models.Document }) => {
  return (
    <div className="p-2 gap-3 center bg-gray-100 border-2 rounded-xl">
      <Preview type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col gap-2">
        <p className="text-[16px]">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="text-gray-500" />
      </div>
    </div>
  );
};

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImagePreview file={file} />
      <DetailRow label="Format:" value={file.extension} />
      <DetailRow label="Size:" value={convertFileSize(file.size)} />
      <DetailRow label="Owner:" value={file.owner.username} />
      <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
    </>
  );
};

export const Share = ({ file, onInputChange, onRemove }: ShareFileProps) => {
  return (
    <>
      <ImagePreview file={file} />

      <div className="flex flex-col gap-2">
        <p className="text-[16px] mt-2 text-left text-gray-700 font-semibold pl-1">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="text-sm"
        />
        <div className="pt-4">
          <div className="flex justify-between text-sm">
            <p className="leading-[14px] text-gray-500">Shared with</p>
            <p className="leading-[14px] text-gray-700">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-[16px] leading[14px]">{email}</p>
                <button
                  onClick={() => onRemove(email, true)}
                  className="p-2 hover:scale-110 transition duration-300"
                >
                  <Image
                    src="/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
