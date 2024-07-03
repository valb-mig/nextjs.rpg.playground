"use client";

import Notification from "@ui/Notification";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
  <>
    <Notification />
      {children}
    </>
  )
};

export default Layout;
