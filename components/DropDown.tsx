"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Button } from "./ui/button";
import {
  deleteFile,
  removeFileUser,
  renameFile,
  sharedFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, Share } from "./ModalContent";
import { ActionType } from "@/types";

const DropDown = ({
  file,
  currentUser,
}: {
  file: Models.Document;
  currentUser: Models.Document;
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();
  const currentUserIsOwner = currentUser.email === file.owner.email;


  const closeAllModals = () => {
    setIsDialogOpen(false);
    setIsDropDownOpen(false);
    setAction(null);
    setName(file.name);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);

    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => sharedFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>((currentUserIsOwner) ? deleteFile({
        fileId: file.$id,
        bucketFileId: file.bucketFieldId,
        path,
      }) : handleRemoveUser(currentUser.email, false))
      
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string, isSharedOption: boolean) => {
    if (!currentUserIsOwner && isSharedOption) {
      alert("Only file owners can remove users.");
      return;
    }

    let success = false;
    const updatedEmails = emails.filter((e) => e !== email);

    success = await removeFileUser({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });
    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return;
    const { label, value } = action;
    return (
      <DialogContent className="border-2 rounded-xl max-lg:max-w-[400px] lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-600">
            {(!currentUserIsOwner && value === "delete")? "Remove" : label}
          </DialogTitle>
          {value === "rename" && (
            <input
              type="text"
              className="px-4 py-2 border-2 rounded-lg text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <Share
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" &&
            (currentUserIsOwner ? (
              <p className="px-4 py-2 text-sm text-center text-gray-600">
                Are you sure you want to delete{` `}
                <span className="font-semibold text-black">{file.name}</span> forever?
              </p>
            ) : (
              <p className="px-4 py-2 text-sm text-center text-gray-600">Do you want to remove <span className="font-semibold text-black">{file.name}</span> from your collection</p>
            ))}
        </DialogHeader>
        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter className="flex-col gap-3">
            <Button
              className={`capitalize rounded-lg ${
                isLoading ? "bg-gray-400 hover:bg-gray-400/50 disabled" : ""
              }`}
              onClick={handleAction}
            >
              {(!currentUserIsOwner && value === "delete")? "Remove" : label}{" "}
              {isLoading && (
                <Image
                  src="/icons/loader.svg"
                  alt="loader"
                  width={20}
                  height={20}
                  className="animate-spin ml-2 stroke-white"
                />
              )}
            </Button>
            <Button
              className="border-2 bg-white text-black hover:bg-white hover:border-black transition duration-300 rounded-lg"
              onClick={closeAllModals}
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
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
                  href={constructDownloadUrl(file.bucketFieldId)}
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
                    src={(!currentUserIsOwner && item.value === "delete")? "/icons/remove.svg" : item.icon}
                    alt={(!currentUserIsOwner && item.value === "delete")? "Remove" : item.label}
                    width={25}
                    height={25}
                  />
                  {(!currentUserIsOwner && item.value === "delete")? "Remove" : item.label}
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
