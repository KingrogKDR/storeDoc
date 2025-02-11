"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-6">
      <motion.div
        className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />

      <p className="mt-4 text-gray-600 text-sm animate-pulse">Loading, please wait...</p>
    </div>
  );
}
