"use client";

import Header from "@layout/Header";
import Sidebar from "@layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-neutral-100 max-h-screen h-screen overflow-y-scroll">
      <Header.App />

      <section role="content" className="flex">
        <Sidebar.App />
        {children}
      </section>
    </main>
  );
};

export default Layout;
