"use client";

import { 
    useState,
    useEffect
} from 'react';

import { z } from 'zod';
import Link from 'next/link';
import useCreate from '@hooks/useCreate';

import { 
  LogIn,
  CirclePlus,
  Plus,
  Dice5
} from 'lucide-react';

import Form from '@ui/Form';
import Button from '@ui/Button';
import Alert from '@ui/Alert';
import Breadcrumbs from "@layout/Breadcrumbs";

type FormData = {
    name: string,
    token: string,
    room: string
};

const ZodSchema = z.object({
    name:  z.string().min(1),
    token: z.string().min(1)
});

const Create = () => {

    const { createRoom } = useCreate();
    const [ roomCode, setRoomCode ] = useState<string>('');

    useEffect(() => {
        setRoomCode(Math.random().toString(36).substring(2, 15));
    }, []);

    const onFormSubmit = async (data: FormData) => {
        data.room = roomCode;
        createRoom(data)
    };

    return (
        <main className="flex flex-col w-screen h-screen bg-background-default">
        
            <Breadcrumbs items={[
                { name: 'Home', href: '/' }, 
                { name: 'Create', href: '/create' }
            ]} />

            <div className='flex gap-2 w-full h-full items-center px-2'>

                <div className='flex flex-col justify-center items-center gap-2 w-full lg:w-1/2'>
                    <div className='flex w-full justify-center items-center p-4'>
                        <h1 className='flex gap-2 text-foreground-1 text-4xl items-center'>
                            <CirclePlus width={50} height={50}/> Create
                        </h1>
                    </div>

                    <div className='flex flex-col gap-2 w-full justify-center items-center px-2'>
                        <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px] bg-shade-4">
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
                            
                            <div className='flex w-full justify-center items-center'>
                                <div className='flex w-full bg-shade-3 p-2 rounded'>
                                    <span className='flex w-full text-foreground-1 text-sm'>
                                        { roomCode }
                                    </span>
                                    <Dice5 onClick={() => setRoomCode(Math.random().toString(36).substring(2, 15))} className='cursor-pointer text-foreground-1'/>
                                </div>
                            </div>
                            
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
                        <Alert 
                            title="Remember" 
                            message="Wen you are creating a new room, you will be the GM. You will be able to create and manage your own rooms."
                            type="info"
                        />
                    </div>
                </div>
            
                <div className='hidden lg:flex flex-col w-full justify-center items-center gap-2 lg:w-1/2'>
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