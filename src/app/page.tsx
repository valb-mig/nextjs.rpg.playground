"use client";

import { useRouter } from 'next/navigation';

const Home = () => {

  const router = useRouter();

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-950 overflow-y-scroll text-neutral-100">
      <div>Home</div>
      <button onClick={() => router.push('/join')}>Join Room</button>  
      <button onClick={() => router.push('/create')}>Create Room</button>
    </main>
    
  );
};

export default Home;