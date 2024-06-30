"use client";

import { useRouter } from "next/navigation";
import Header from "@layout/Header";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Header />

      <main className="flex flex-col w-screen h-screen bg-background-default overflow-y-scroll text-neutral-100">
        <button onClick={() => router.push("/connect")}>Connect to Room</button>
      </main>
    </>
  );
};

export default Home;
