import { Models } from "node-appwrite";

declare type FormType = "sign-in" | "sign-up";

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface PreviewProps {
  type: string;
  extension: string;
  url?: string;
  className?: string;
  imageClassName?: string;
}

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

declare interface ShareFileProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string, isSharedOption: boolean) => void;
}

declare interface sharedFileProps {
  fileId: string;
  emails: string[];
  path: string;
}

declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}
