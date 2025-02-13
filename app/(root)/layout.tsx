import HomeSkeleton from "@/components/HomeSkeleton";
import Loading from "@/components/Loading";
import { Toaster } from "@/components/ui/toaster";
import React, { Suspense } from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full min-h-screen relative center bg-gray-200 md:px-16 md:py-12 overflow-scroll">
      <Suspense fallback={<HomeSkeleton />}>
        <div className="bg-white min-h-full min-w-full rounded-2xl px-8 py-4">
          {children}
        </div>
        <Toaster />
      </Suspense>
    </main>
  );
};

export default HomeLayout;
