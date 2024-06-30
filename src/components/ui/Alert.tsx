"use client";

import { tv } from "tailwind-variants";

import { Info, TriangleAlert, Skull } from "lucide-react";
("");

const Alert = ({
  title,
  message,
  type,
}: {
  title: string;
  message: string;
  type: "info" | "warning" | "error";
}) => {
  let icon: React.ReactNode;

  switch (type) {
    case "info":
      icon = <Info width={20} height={20} className="text-blue-800" />;
      break;
    case "warning":
      icon = (
        <TriangleAlert width={20} height={20} className="text-yellow-800" />
      );
      break;
    case "error":
      icon = <Skull width={20} height={20} className="text-red-800" />;
      break;
    default:
      icon = <Info width={20} height={20} className="text-blue-800" />;
  }

  const variant = tv({
    variants: {
      box: {
        info: "border-blue-500 bg-blue-50",
        warning: "border-yellow-500 bg-yellow-50",
        error: "border-red-500 bg-red-50",
      },
      header: {
        info: "text-blue-800",
        warning: "text-yellow-800",
        error: "text-red-800",
      },
      content: {
        info: "text-blue-700",
        warning: "text-yellow-700",
        error: "text-red-700",
      },
    },
  });

  return (
    <div
      role="alert"
      className={`rounded border-s-4 p-4 w-full md:w-[500px] ${variant({ box: type })}`}
    >
      <div className={`flex items-center gap-2 ${variant({ header: type })}`}>
        {icon}
        <strong className="block font-medium"> {title} </strong>
      </div>

      <p className={`mt-2 text-sm ${variant({ content: type })}`}>{message}</p>
    </div>
  );
};

export default Alert;
