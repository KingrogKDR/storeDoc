"use client";

export default function HomeSkeleton() {
  return (
    <div className="w-full mt-8 lg:mt-0 overflow-clip animate-pulse">
      {/* Header Section */}
      <div className="lg:flex justify-between items-center pl-5 pb-10 lg:pb-0 gap-x-3">
        <div className="center">
          {/* Logo Placeholder */}
          <div className="w-36 h-36 xl:w-40 xl:h-40 bg-gray-300 rounded-lg" />

          {/* Tagline Placeholder */}
          <div className="mt-2 h-6 w-48 bg-gray-300 rounded-md ml-10"></div>
        </div>

        {/* Profile Section */}
        <div className="2xl:w-1/2 center 2xl:justify-between gap-6">
          <div className="center gap-3">
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="lg:block hidden">
              <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-3 w-32 bg-gray-300 rounded-md mt-1"></div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="center gap-3">
            {/* Upload Button Skeleton */}
            <div className="h-10 w-24 bg-gray-300 rounded-3xl"></div>
            {/* Logout Button Skeleton */}
            <div className="h-10 w-24 bg-gray-300 rounded-3xl"></div>
          </div>
        </div>
      </div>

      {/*  Content Section */}
      <div className="md:flex gap-3">
        {/*  Analytics Skeleton */}
        <div className="md:w-1/2 px-4 mb-10 py-2">
          <div className="h-40 bg-gray-300 rounded-lg"></div>
        </div>

        {/* File List Skeleton */}
        <div className="md:w-1/2 px-4 py-2">
          {/* Search Bar Skeleton */}
          <div className="h-10 w-full bg-gray-300 rounded-lg mb-4"></div>

          {/* File List Skeleton (Simulating 5 Items) */}
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full bg-gray-300 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
