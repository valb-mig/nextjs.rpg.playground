"use client";

import { RoomProvider } from "@/context/RoomContext";

import Header from "@layout/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider>
      <main className="flex flex-col w-fit h-screen bg-background-default text-foreground-1">
        <Header.Room />

        <section role="content" className="flex w-screen h-full">
          {children}
        </section>
      </main>
    </RoomProvider>
  );
};

export default Layout;
