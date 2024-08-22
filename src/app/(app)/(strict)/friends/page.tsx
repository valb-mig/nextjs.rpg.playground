"use client";

import LoadingScreen from "@/components/layout/LoadingScreen";

const Friends = ({ params }: { params: { id: string} }) => {

  return (
    <>
      <LoadingScreen loading={false} />

      <div className="flex flex-col w-full p-8 gap-16">
      </div>
    </>
    
  );
};

export default Friends;
