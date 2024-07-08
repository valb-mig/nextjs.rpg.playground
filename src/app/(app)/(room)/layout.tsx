"use client";

import Header from "@layout/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-fit h-screen bg-background-default text-foreground-1">
      <Header.Room />

      <section role="content" className="flex w-screen h-full">
        {children}
      </section>
    </main>
  );
};

export default Layout;
