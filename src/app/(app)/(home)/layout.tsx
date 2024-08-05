"use client";

import Header from "@layout/Header";
import Sidebar from "@layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full text-neutral-100 overflow-y-scroll">
      <Header.App />

      <section role="content" className="flex h-full">
        <Sidebar.App />
        {children}
      </section>
    </main>
  );
};

export default Layout;
