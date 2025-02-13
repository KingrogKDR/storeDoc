"use client";
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchWidth, setSearchWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function updateWidth() {
    if (window.innerWidth < 640) setSearchWidth(150);
    else if (window.innerWidth < 1024) setSearchWidth(300);
    else setSearchWidth(450);
  }

  function handleClickOutside(event: MouseEvent) {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="relative flex">
      <motion.div
        ref={inputRef}
        className={`relative flex items-center bg-white ${
          isOpen ? "border shadow-md" : ""
        }  rounded-full overflow-hidden`}
        initial={{ width: 50 }} 
        animate={{ width: isOpen ? searchWidth : 50 }} // 
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          className="p-2 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Search className="w-4 h-4 text-gray-600" />
        </button>

        <motion.input
          type="text"
          placeholder="Search..."
          className={`w-full lg:w-80 px-2 py-2 outline-none text-sm ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
