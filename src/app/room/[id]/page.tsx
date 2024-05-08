"use client";

import React, { useState, useEffect } from 'react';
import { icons } from 'lucide-react';
import { socket } from "@/socket";
import { getUserData } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import type { UserInfo } from '@/types/interfaces';

import Dice from '@/components/ui/Dice';

type ParamsType = {
    id: string
}

interface RoomProps {
    params: ParamsType
}

const Room = ({ params }: RoomProps) => {
    
    const router = useRouter();

    const [ diceMax, setDiceMax ] = useState(4);

    const [ roomUsers, setRoomUsers ] = useState<{ [index: string]: UserInfo }>({});
    const [ userData, setUserData ] = useState();

    useEffect(() => {

        if(getUserData() == undefined || getUserData() == null) {
            router.push('/');
            return;
        }
    
        socket.on('res_hello', (usersArray: any) => {

            let users: any = [];

            usersArray.map((user: any) => {

                let newUser: UserInfo = JSON.parse(user.user_data);
                users.push(newUser);
            });

            setRoomUsers(users);
        });

        socket.on('res_enter_room', (user: string) => {
           
            socket.emit('req_hello', {
                'room': params.id, 
                'user_data': JSON.stringify(getUserData())
            });
        });

        socket.emit('req_enter_room', {
            'room': params.id, 
            'user_data': JSON.stringify(getUserData())
        });

        return () => {
            socket.off('res_enter_room');
            socket.off('res_hello');
        };
    }, [])

    return (
        <main className="flex flex-col w-screen h-screen bg-neutral-900">

            <div className='flex flex-col gap-2 p-2 bg-neutral-700 absolute rounded'>
                {roomUsers ? 
                    Object.values(roomUsers).map((user: UserInfo, index) => (
                        <div key={index} className='bg-neutral-800 p-2 rounded'>
                            <span className='flex gap-2'>
                                <icons.User className='bg-neutral-700 rounded-full p-1'/>{user.character_name}
                            </span>
                        </div>
                    )) 
                    : 
                    (
                        <span>Loading party...</span>
                    )
                }
            </div>
            
            <div className='flex w-full justify-center'>
            <section className='flex flex-col justify-center items-center gap-2 w-40 mt-[30vh]'>
                <div className='flex gap-2 bg-neutral-800 p-2 rounded w-full'>
                {[
                    {
                    name: 'd4',
                    number: 4
                    },
                    {
                    name: 'd6',
                    number: 6
                    },
                    {
                    name: 'd10',
                    number: 10
                    },
                    {
                    name: 'd20',
                    number: 20
                    }
                ].map((value) => (
                    <span 
                    key={value.number} 
                    onClick={() => {setDiceMax(value.number)}} 
                    className={'flex justify-center items-center '+(diceMax == value.number ? 'bg-blue-300' : 'bg-neutral-50')+' w-8 h-8 rounded text-sm cursor-pointer'}>
                    {value.name}
                    </span>
                ))}
                </div>
                <div id="dice" className='flex justify-center items-center w-full h-full'>
                <Dice max={diceMax} room={params.id}/>
                </div>
            </section>
    
            </div>
        </main>
    );
}

export default Room;