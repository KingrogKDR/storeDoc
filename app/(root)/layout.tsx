import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {  
  return <main className="h-screen center bg-gray-200 md:px-16 md:py-12">    
    <div className='bg-white min-h-full min-w-full rounded-2xl center px-8 py-4'>
        {children}
    </div>
  </main>
};

export default HomeLayout;
