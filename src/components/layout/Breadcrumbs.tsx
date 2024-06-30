"use client";

import Link from "next/link";

interface BreadcrumbsProps {
  items: Array<{ name: string; href: string }>;
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full justify-center items-start p-2">
      <div className="flex gap-2 items-center">
        {items.map((item, index) => (
          <div key={item.name} className="flex gap-2 items-center">
            <Link
              href={item.href}
              className="text-xs flex items-center justify-center text-shade-1 w-full bg-shade-5 hover:bg-shade-4 p-1 px-2 transition rounded-full"
            >
              {item.name}
            </Link>

            {index < items.length - 1 && (
              <span className="text-shade-1 text-sm">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
