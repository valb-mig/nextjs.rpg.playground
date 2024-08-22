"use client";

import { RoomProvider } from "@/context/RoomContext";

import Header from "@layout/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider>
      <main className="flex flex-col h-full text-neutral-100 overflow-y-scroll">
        <Header.App />

        <section role="content" className="flex h-full">
          {children}
        </section>
      </main>
    </RoomProvider>
  );
};

export default Layout;
