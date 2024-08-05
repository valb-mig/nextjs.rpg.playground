"use client";

import Notification from "@ui/Notification";
import { GlobalProvider } from "@/context/GlobalContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalProvider>
      <Notification />
      {children}
    </GlobalProvider>
  )
};

export default Layout;
