"use client";

import { z } from 'zod';
import { getUserData } from '@/handlers/handleUser';
import Link from 'next/link';

import { 
  LogIn,
  Dices,
  Plus
} from 'lucide-react';

import useHome from "@/hooks/useHome";

import Form from '@ui/Form';

const ZodSchema = z.object({
  character_name: z.string().min(1).max(10),
  room_code: z.string().min(1)
});

const Join = () => {

  const userData = getUserData();

  const { enterRoom } = useHome();

  const onFormSubmit = async (data: any) => {
    enterRoom(data);
	};

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
      
        { userData && (
            <div className="flex w-full justify-end p-2">
                <div className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-lg">
                    <span className="rounded-lg bg-neutral-800 text-white">
                    Bem-vindo de volta, {userData.character_name}
                    </span>
                    <button onClick={() => {enterRoom(userData)}} className="bg-blue-300 p-2 rounded">
                    Voltar para sala <b>{userData.room_code}</b>
                    </button>
                </div>
            </div>
        )}

        <div className='flex w-full justify-center items-center p-4 mt-[20vh]'>
            <h1 className='flex gap-2 text-foreground-1 text-4xl items-center'>
                <Dices width={50} height={50}/> RPG Playgorund
            </h1>
        </div>

        <div className='flex flex-col gap-2 w-full justify-center items-center px-2'>

            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px]">

            <div className='flex flex-col justify-centerw-full items-center'>
                <img src='https://via.placeholder.com/60x60' className='rounded-full' width={60} height={60} />
                <input type="file" name="character_image" />
            </div>

            <Form.Input
                label="Character Name"
                name="character_name" 
            />
            
            <Form.Input
                label="Room Code" 
                name="room_code"
            />

            <div className="flex w-full justify-end">
                <button type="submit" className="flex items-center gap-2 border-2 border-blue-300 bg-blue-300 hover:bg-transparent hover:text-blue-300 p-2 rounded transition">
                <LogIn/>
                Enter
                </button>
            </div>
            </Form.Body>
        </div>

        <div className='absolute bottom-0 right-0 flex gap-2 items-center p-2'>
            <Link href="/create" className='flex items-center justify-center text-shade-1  w-full bg-shade-4 size-14 transition rounded-full'>
                Create Room
                <Plus width={30} height={30} className='bg-shade-4 text-shade-1'/>
            </Link>
        </div>
    </main>
  );
}

export default Join;