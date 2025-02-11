"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Models } from "node-appwrite";
import Image from "next/image";
import { actionsArray, dropdownItems } from "@/lib/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";

const DropDown = ({ file }: { file: Models.Document }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  const renderDialogContent = () => {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger>
          <Image
            src="/icons/dropdown.svg"
            alt="dropdown icon"
            width={8}
            height={8}
            className="size-4"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className="text-xs lg:text-sm"
              onClick={() => {
                setAction(item);

                if (actionsArray.includes(item.value)) {
                  setIsDialogOpen(true);
                }
              }}
            >
              {item.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={25}
                    height={25}
                  />
                  {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={25}
                    height={25}
                  />
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default DropDown;
