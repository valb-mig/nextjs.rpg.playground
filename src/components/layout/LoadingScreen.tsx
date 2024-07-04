"use client";

import { LoaderIcon } from "lucide-react";

const LoadingScreen = ({ loading }: { loading: boolean }) => {
  return (
    <>
        { loading && (
            <div 
            className="absolute h-screen w-screen flex items-center justify-center backdrop-blur-lg bg-transparent" 
            popover="auto"
            >
                <LoaderIcon className="text-primary h-12 w-12 animate-spin" />
            </div>
        )}
      </>
  );
};

export default LoadingScreen;