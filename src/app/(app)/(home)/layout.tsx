"use client";

import Header from "@layout/Header";
import Sidebar from "@layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-screen h-full bg-background-default text-foreground-1">
      <Header.App />

      <section role="content" className="flex w-screen h-full">
        <Sidebar.App />
        {children}
      </section>
    </main>
  );
};

export default Layout;
