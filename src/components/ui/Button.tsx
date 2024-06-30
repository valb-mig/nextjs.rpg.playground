"use client";

import { LoaderIcon } from "lucide-react";
interface ButtonProps {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({
  type,
  loading,
  children,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 border-2 border-blue-300 bg-blue-300 ${loading ? "bg-transparent text-blue-300" : ""}  hover:bg-transparent hover:text-blue-300 p-1 px-2 rounded-full transition ${className}`}
      onClick={onClick}
      disabled={loading ? true : false}
    >
      {loading ? (
        <>
          <span className="border-blue-300">
            <LoaderIcon className="h-4 w-4 animate-spin" />
          </span>
          loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
