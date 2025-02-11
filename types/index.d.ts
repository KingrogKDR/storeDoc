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

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}
