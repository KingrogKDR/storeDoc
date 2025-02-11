export const fileRoutes = [
  { name: "Documents", url: "/documents" },
  { name: "Images", url: "/images" },
  { name: "Videos", url: "/videos" },
  { name: "Audio", url: "/audio" },
  { name: "Others", url: "/others" },
];

export const dropdownItems = [
  {
    label: "Rename",
    icon: "/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/icons/delete.svg",
    value: "delete",
  },
];

export const actionsArray = [
  "rename",
  "details",
  "share",
  "download",
  "delete",
];

export const avatarplaceholder = "/images/avatar-placeholder.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
