import FileDisplaySection from "@/components/FileDisplaySection";
import Loading from "@/components/Loading";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import { Models } from "node-appwrite";
import React, { Suspense } from "react";

const page = async ({ params, searchParams }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchString = ((await searchParams)?.query as string) || "";
  const sortString = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const fileDocumentList = await getFiles({
    types,
    searchText: searchString,
    sort: sortString,
  });

  const files = fileDocumentList?.documents || [];

  const totalSizeInBytes = files.reduce((total: number, file: Models.Document) => total + (file.size || 0), 0);

  const totalSizeOfCertainFileTypes = convertFileSize(totalSizeInBytes)
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen">
        <header className="px-4 py-2 items-center">
          <p className="capitalize text-center border-b-2 pb-2 mt-10">{type}</p>
        </header>
        <section>
          <div className="flex gap-3 items-center justify-between px-4 py-2">
            <div className="lg:w-2/3">
              <p className="text-[14px] lg:text-xs font-semibold text-gray-600 mr-2">
                Size: {totalSizeOfCertainFileTypes}
              </p>
            </div>
            <div className="center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <p className="body-1 hidden text-gray-600 sm:block">Sort by:</p>

                <Sort />
              </div>
            </div>
          </div>
          <FileDisplaySection files={fileDocumentList} />
        </section>
      </div>
    </Suspense>
  );
};

export default page;
