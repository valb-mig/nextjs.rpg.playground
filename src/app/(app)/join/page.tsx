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
import Button from '@ui/Button';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ZodSchema = z.object({
    character_token: z.string().min(1),
    character_name: z.string().min(1).max(10),
    room_code: z.string().min(1),
    character_image: z.any()
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
                <Dices width={50} height={50}/> Join
            </h1>
        </div>

        <div className='flex flex-col gap-2 w-full justify-center items-center px-2'>

            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px]">

            <div className='flex justify-center w-full items-center gap-2'>
                <img src='https://via.placeholder.com/60x60' className='border-2 border-blue-300 rounded-full' width={60} height={60} />

                <Form.Input
                    label="Character image"
                    name="character_image" 
                    type="file"
                />
            </div>

            <Form.Input
                label="Character name"
                name="character_name" 
                type="text"
            />

            <Form.Input
                label="Character token"
                name="character_token"
                type="password"
            />
            
            <Form.Input
                label="Room code" 
                name="room_code"
                type="text"
            />

            <div className="flex w-full justify-end">
                <div className='flex gap-2 items-center'>
                    <Link href="/create" className='flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full'>
                        <Plus width={30} height={30} className='text-shade-1'/>
                        Create Room
                    </Link>
                    <Button type="submit">
                        <LogIn/>
                        Enter
                    </Button>
                </div>
            </div>
            </Form.Body>
        </div>
    </main>
  );
}

export default Join;