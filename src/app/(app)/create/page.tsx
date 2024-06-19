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
    room_code: z.string().min(1)
});

const Create = () => {

  const userData = getUserData();

  const { enterRoom } = useHome();

    const onFormSubmit = async (data: any) => {
        enterRoom(data);
    };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
      
        <div className='flex w-full justify-center items-center p-4 mt-[20vh]'>
            <h1 className='flex gap-2 text-foreground-1 text-4xl items-center'>
                <Plus width={50} height={50}/> Create
            </h1>
        </div>

        <div className='flex flex-col gap-2 w-full justify-center items-center px-2'>

            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px]">

            <Form.Input
                label="GM name"
                name="gm_name" 
                type="text"
            />

            <Form.Input
                label="GM token"
                name="gm_token"
                type="password"
            />
            
            <Form.Input
                label="Room code" 
                name="room_code"
                type="text"
            />

            <div className="flex w-full justify-end">
                <div className='flex gap-2 items-center'>
                    <Link href="/join" className='flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full gap-2'>
                        <LogIn width={30} height={30} className='text-shade-1'/>
                        Join Room
                    </Link>
                    <Button type="submit">
                        <Plus/>
                        Create
                    </Button>
                </div>
            </div>
            </Form.Body>
        </div>
    </main>
  );
}

export default Create;