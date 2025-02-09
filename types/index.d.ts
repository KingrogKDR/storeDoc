declare type FormType = "sign-in" | "sign-up";

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface PreviewProps {
    type: string,
    extension: string,
    url?: string
}