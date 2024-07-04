"use client";

import { tv } from "tailwind-variants";

import { LoaderIcon } from "lucide-react";
interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  style?: "action" | "button";
  role?: "success" | "danger" | "warning" | "info" | "default";
}

const Button = ({
  type,
  style,
  role,
  loading,
  children,
  onClick,
  className,
}: ButtonProps) => {

  const variants = tv({
    variants: {
      style: {
        action: "size-8 p-2",
        button: "p-1 px-2"
      },
      role: {
        success: "bg-primary text-foreground-1 border-primary hover:bg-transparent hover:text-primary",
        danger:  "bg-danger text-foreground-1 border-danger hover:bg-transparent hover:text-danger",
        warning: "bg-warning text-foreground-1 border-warning hover:bg-transparent hover:text-warning",
        info:    "bg-info text-foreground-1 border-info hover:bg-transparent hover:text-info",
        default:  "bg-shade-3 text-foreground-1 border-shade-2 hover:bg-transparent hover:text-shade-2",
      },
    },
    defaultVariants: {
      style: "button",
      type: "default",
    },
  });

  return (
    <button
      type={type || "button"}
      className={`flex items-center gap-2 border-2 rounded-full transition ${loading ? "bg-transparent" : ""} ${className} ${variants({ style: style, role: role })}`}
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
