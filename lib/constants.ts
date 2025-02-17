export const fileRoutes = [
  { name: "Documents", url: "/documents" },
  { name: "Images", url: "/images" },
  { name: "Videos", url: "/videos" },
  { name: "Audio", url: "/audio" },
  { name: "Others", url: "/others" },
];

export const navItems = [
  { label: "Dashboard", imageUrl: "/icons/dashboard.svg", href: "/" },
  { label: "Documents", imageUrl: "/icons/documents.svg", href: "/documents" },
  { label: "Images", imageUrl: "/icons/images.svg", href: "/images" },
  { label: "Videos", imageUrl: "/icons/videos.svg", href:"/videos" },
  { label: "Audio", imageUrl: "/icons/audio.svg", href: "/audio" },
  { label: "Others", imageUrl: "/icons/others.svg", href:"/others" },
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

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Date created (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];


export const actionsArray = ["rename", "details", "share", "delete"];

export const avatarplaceholder = "/images/avatar-placeholder.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
