"use client";

import { useRouter } from "next/navigation";
import Header from "@layout/Header";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Header.Home />

      <main className="flex flex-col w-screen h-screen bg-background-default overflow-y-scroll text-neutral-100">

        <section className="flex flex-col justify-center gap-4 mt-32">
          <h2 className="text-center text-6xl font-bold text-foreground-1">
            Start your journey
          </h2>

          <div className="flex justify-center items-center">
            <button onClick={() => router.push("/connect")} className="font-bold flex border-2 border-primary bg-primary p-2 rounded hover:bg-transparent hover:text-primary transition-all">
              Connect
            </button>
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
