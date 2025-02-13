import FileDisplaySection from "@/components/FileDisplaySection";
import Loading from "@/components/Loading";
import React, { Suspense } from "react";

const page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen">
        <header className="px-4 py-2 items-center">
          <p className="capitalize text-center border-b-2 pb-2">{type}</p>
        </header>
        <section>
          <FileDisplaySection />
        </section>
      </div>
    </Suspense>
  );
};

export default page;
