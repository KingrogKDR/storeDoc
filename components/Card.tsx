import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Preview from "./Preview";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize } from "@/lib/utils";
import DropDown from "./DropDown";
import { getCurrentUser } from "@/lib/actions/user.actions";

const Card = async ({
  file,
}: {
  file: Models.Document;
}) => {
  const currentUser = await getCurrentUser();
  return (
    <Link
      href={file.url}
      target="_blank"
      className="lg:max-w-[400px] flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3 border-2 mx-4 my-4"
    >
      <div className="flex justify-between">
        <Preview
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <DropDown file={file} currentUser={currentUser}/>
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="text-sm line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-gray-400"
        />
        <p className="text-sm line-clamp-1 text-gray-600">
          By: {file.owner.username}
        </p>
      </div>
    </Link>
  );
};

export default Card;
