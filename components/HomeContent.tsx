import React from "react";
import Analytics from "./Analytics";
import FileRoute from "./FileRoute";
import { fileRoutes } from "@/lib/constants";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { logoutUser } from "@/lib/actions/user.actions";
import Uploader from "./Uploader";
import SearchBar from "./SearchBar";

const HomeContent = ({
  username,
  email,
  avatar,
}: {
  username: string;
  email: string;
  avatar: string;
}) => {
  return (
    <div className="w-full mt-8 lg:mt-0 overflow-clip">
      <div className="lg:flex justify-between items-center pb-10 lg:pb-0 gap-x-3">
        <div className="center">
          <Image src="/icons/logo.svg" alt="logo" width={50} height={50} className="size-36 xl:size-40"/> 
        </div>
        <div className="2xl:w-1/2 center 2xl:justify-between gap-6">
          <div className="center gap-3">
            <Image
              src={avatar}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="lg:block hidden">
              <p className="text-sm text-gray-600">{username}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
          <div className="center gap-3">
            <Uploader />
            <button
              className="border-2 border-gray-600 hover:bg-black hover:text-white transition-all duration-500 flex gap-2 items-center text-black md:px-4 px-2 py-2 rounded-3xl text-xs"
              onClick={logoutUser}
            >
              Logout
              <LogOutIcon className="w-4 h-4 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex gap-3">
        <div className="md:w-1/2 px-4 mb-10 py-2">
          <Analytics />
        </div>
        <div className="md:w-1/2 px-4 py-2">
          <SearchBar />
          {fileRoutes.map(({ name, url }) => {
            return (
              <Link key={name} href={url}>
                <FileRoute name={name} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
