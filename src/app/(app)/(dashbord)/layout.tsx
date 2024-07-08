"use client";

import Header from "@layout/Header";
import Sidebar from "@layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full">
      <Header.App />

      <section role="content" className="flex w-screen">
        <Sidebar.App />
        {children}
      </section>
    </main>
  );
};

export default Layout;
