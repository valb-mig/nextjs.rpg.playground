"use client";

import { z } from 'zod';
import { getUserData } from '@/handlers/handleUser';
import Link from 'next/link';

import { 
  LogIn,
  CirclePlus,
  Plus
} from 'lucide-react';

import useJoin from "@/hooks/useJoin";

import Form from '@ui/Form';
import Button from '@ui/Button';
import Breadcrumbs from "@layout/Breadcrumbs";

const ZodSchema = z.object({
    name:  z.string().min(1),
    token: z.string().min(1),
    room:  z.string().min(1)
});

const Create = () => {

  const { enterRoom } = useJoin();

    const onFormSubmit = async (data: any) => {
        enterRoom(data);
    };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
      
        <Breadcrumbs items={[
            { name: 'Home', href: '/' }, 
            { name: 'Create', href: '/create' }
        ]} />

        <div className='flex gap-2 w-full h-full items-center px-2'>

            <div className='flex flex-col justify-center items-center gap-2 w-1/2'>
                <div className='flex w-full justify-center items-center p-4'>
                    <h1 className='flex gap-2 text-foreground-1 text-4xl items-center'>
                        <CirclePlus width={50} height={50}/> Create
                    </h1>
                </div>

                <div className='flex flex-col gap-2 w-full justify-center items-center px-2'>

                    <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px]">

                    <Form.Input
                        label="Username"
                        name="name" 
                        type="text"
                    />

                    <Form.Input
                        label="Token"
                        name="token"
                        type="password"
                    />
                    
                    <Form.Input
                        label="Room" 
                        name="room"
                        type="text"
                    />

                    <div className="flex w-full justify-end">
                        <div className='flex gap-2 items-center'>
                            <Link href="/connect" className='flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full gap-2'>
                                <LogIn width={30} height={30} className='text-shade-1'/>
                                Connect
                            </Link>
                            <Button type="submit">
                                <Plus/>
                                Create
                            </Button>
                        </div>
                    </div>
                    </Form.Body>
                </div>
            </div>
           
            <div className='flex flex-col justify-center items-center gap-2 h-full w-1/2'>
                <span className='text-5xl text-foreground-1 font-bold text-center'>
                    Create a new world
                    <p className='text-sm italic text-foreground-4'>"Start an history with big adventures"</p>
                </span>
            </div>
        </div>
    </main>
  );
}

export default Create;