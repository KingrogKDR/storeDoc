"use client"

import HomeSkeleton from "@/components/HomeSkeleton";
import IconWithTooltip from "@/components/IconWithTooltip";
import SearchBar from "@/components/SearchBar";
import { Toaster } from "@/components/ui/toaster";
import { navItems } from "@/lib/constants";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()
  const showSearchBar = path !== "/" && path !== "/dashboard";
  return (
    <main className="h-full min-h-screen relative center bg-gray-200 md:px-16 md:py-12 overflow-scroll">
      <Suspense fallback={<HomeSkeleton />}>
        <div className="bg-white min-h-full min-w-full rounded-2xl px-8 py-4">
          {showSearchBar && (
            <div className="center max-lg:flex-col gap-6 lg:gap-16 mt-3">
              <SearchBar />
              <div className="flex gap-5">
                {navItems.map((item, index) => (
                  <IconWithTooltip {...item} key={index} />
                ))}
              </div>
            </div>
          )}
          {children}
        </div>
        <Toaster />
      </Suspense>
    </main>
  );
};

export default HomeLayout;
