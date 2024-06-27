"use client";

import { z } from 'zod';
import Link from 'next/link';

import { 
  LogIn,
  Dices
} from 'lucide-react';

import useJoin from "@hooks/useJoin";

import Form from '@ui/Form';
import Button from '@ui/Button';

import Breadcrumbs from "@layout/Breadcrumbs";

const ZodSchema = z.object({
    name:  z.string().min(1),
    token: z.string().min(1).max(10),
    room:  z.string().min(1),
    image: z.any()
});

const Join = () => {

  const { joinRoom } = useJoin();

    const onFormSubmit = async (data: any) => {

        joinRoom(data);
    };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
        
        <Breadcrumbs items={[
            { name: 'Home', href: '/' }, 
            { name: 'Join', href: '/join' }
        ]} />
    
        <div className='flex gap-2 w-full h-full items-center px-2'>

            <div className='flex flex-col justify-center items-center gap-2 w-1/2'>

                <div className='flex w-full justify-center items-center p-4'>
                    <h1 className='flex gap-2 text-foreground-1 text-4xl items-center'>
                        <Dices width={50} height={50}/> Join
                    </h1>
                </div>

                <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="w-full md:w-[500px]">
                    <div className='flex justify-center w-full items-center gap-2'>
                        <img src='https://via.placeholder.com/60x60' className='border-2 border-blue-300 rounded-full' width={60} height={60} />

                        <Form.Input
                            label="User image"
                            name="image" 
                            type="file"
                        />
                    </div>

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
                            <Link href="/connect" className='flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full'>
                                <LogIn width={30} height={30} className='text-shade-1'/>
                                Connect
                            </Link>
                            <Button type="submit">
                                <LogIn/>
                                Join
                            </Button>
                        </div>
                    </div>
                </Form.Body>
            </div>

            <div className='flex flex-col justify-center items-center gap-2 h-full w-1/2'>
                <span className='text-5xl text-foreground-1 font-bold text-center'>
                    Start a new history
                    <p className='text-sm italic text-foreground-4'>"Create a new character and start a new history"</p>
                </span>
            </div>
        </div>
    </main>
  );
}

export default Join;