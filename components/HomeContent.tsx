"use client"

import React, { useEffect, useState } from "react";
import FileRoute from "./FileRoute";
import { fileRoutes } from "@/lib/constants";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { logoutUser } from "@/lib/actions/user.actions";
import Uploader from "./Uploader";
import { Analytics } from "./Analytics";
import { getTotalSpace } from "@/lib/actions/file.actions";

const HomeContent = ({
  $id: ownerId,
  accountId,
  username,
  email,
  avatar,
}: {
  username: string;
  email: string;
  avatar: string;
  $id: string;
  accountId: string;
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [totalSpace, setTotalSpace] = useState<{ used: number }>({ used: 0 });

  const handleLinkClick = (name: string) => {
    setIsLoading(name);
  }; 
  
  useEffect(() => {
    const fetchTotalSpace = async () => {
      try {
        const space = await getTotalSpace();
        setTotalSpace(space);
      } catch (error) {
        console.error("Error fetching total space:", error);
      }
    };

    fetchTotalSpace();
  }, []);

  return (
    <div className="w-full mt-8 lg:mt-0 overflow-clip">
      <div className="lg:flex justify-between items-center pb-10 lg:pb-0 gap-x-3">
        <div className="center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className="size-36 xl:size-40 hover:scale-110 transition duration-500"
            onClick={() => window.location.reload()}
          />
          <h1 className="text-sm lg:hidden xl:block 2xl:text-2xl font-handwritten text-gray-800 text-center leading-relaxed transition ease-in-out duration-300 hover:animate-pulse">
            <span className="text-gray-500">A </span>
            <span className="text-orange-500 text-xl 2xl:text-4xl underline decoration-4">
              free
            </span>
            <span className="text-gray-500"> storage </span>
            <span className="text-green-500 italic text-xl 2xl:text-4xl">
              solution
            </span>
            <span className="text-gray-500"> online</span>
          </h1>
        </div>
        <div className="2xl:w-1/2 center 2xl:justify-between gap-6">
          <div className="center gap-3">
            <Image
              src={avatar}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full hover:animate-spin transition duration-500"
            />
            <div className="lg:block hidden hover:animate-pulse transition duration-300">
              <p className="text-sm text-gray-600">{username}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
          <div className="center gap-3">
            <Uploader ownerId={ownerId} accountId={accountId} />
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
          <Analytics used={totalSpace.used}/>
        </div>
        <div className="md:w-1/2 px-4 py-2">
          {fileRoutes.map(({ name, url }, index) => {
            return (
              <Link
                key={`${name}-${index}`}
                href={isLoading ? "#" : url}
                onClick={(e) =>
                  isLoading ? e.preventDefault() : handleLinkClick(name)
                }
                className={`relative block ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <div className="relative">
                  <FileRoute name={name} />
                  {isLoading === name && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
