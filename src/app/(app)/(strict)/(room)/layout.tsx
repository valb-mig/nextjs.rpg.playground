"use client";

import { RoomProvider } from "@/context/RoomContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider>
      {children}
    </RoomProvider>
  );
};

export default Layout;
