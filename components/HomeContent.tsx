import React from "react";
import Analytics from "./Analytics";
import FileRoute from "./FileRoute";
import { fileRoutes } from "@/lib/constants";
import Link from "next/link";
import { LogOutIcon, Upload } from "lucide-react";
import Image from "next/image";
import { logoutUser } from "@/lib/actions/user.actions";

const HomeContent = ({
  username,
  email,
  avatar,
}: {
  username: string;
  email: string;
  avatar: string;
}) => {
    console.log("Avatar Url:", avatar)
  return (
    <div className="w-full">
      <div className="flex justify-center md:justify-end pb-16 gap-x-3">
        <Image 
            src={avatar.toString()}
            alt="avatar"
            width={60}
            height={60}
        />
        <div className="lg:block hidden">
            <p className="text-sm text-gray-600">{username}</p>
            <p className="text-xs text-gray-400">{email}</p>
        </div>
        <button className="bg-black hover:text-black hover:border-2 hover:border-black hover:bg-white hover:scale-110 transition-all duration-500 flex gap-2 items-center text-white px-4 py-2 rounded-3xl text-xs md:text-sm">
          <Upload className="w-4 h-4 group-hover:invert" />
          Upload
        </button>
        <button className="border-2 border-black hover:bg-black hover:text-white transition-all duration-500 flex gap-2 items-center text-black px-4 py-2 rounded-3xl text-xs md:text-sm"
        onClick={logoutUser}
        >
          Logout
          <LogOutIcon className="w-4 h-4 group-hover:text-white" />
        </button>
      </div>
      <div className="md:flex gap-3">
        <div className="md:w-1/2 px-4 mb-10 py-2">
          <Analytics />
        </div>
        <div className="md:w-1/2 px-4 py-2">
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
