"use client";

import Image from "next/image";

import Header from "@layout/Header";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header.Home />

      <main className="flex flex-col w-screen h-screen bg-background-default overflow-y-scroll text-neutral-100">
        <section className="relative flex flex-col justify-center items-center mt-32">
          <div className="relative flex flex-col justify-center items-center gap-4 z-10">
            <Image
              src="/img/rpg-logo.svg"
              alt="logo"
              className="size-32 pointer-events-none animate-bounce"
              width={32}
              height={32}
            />
            <h2 className="text-center text-6xl font-bold text-foreground-1 ">
              Start your journey
            </h2>

            <div className="flex justify-center items-center">
              <Link
                href="/connect"
                className="font-bold flex border-2 border-primary bg-primary p-2 px-4 rounded-full hover:bg-transparent hover:text-primary transition-all"
              >
                Start
              </Link>
            </div>
          </div>

          <div className="block bg-primary blur-[100px] size-96 rounded-full absolute top-0 opacity-20 transition-all"></div>
        </section>
      </main>
    </>
  );
};

export default Home;
