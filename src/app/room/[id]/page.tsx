"use client";

import React, { useState, useEffect } from 'react';

import { 
    User 
} from 'lucide-react';

import { socket } from "@/socket";

import { 
    getUserData,
    updateUserData
} from '@/utils/helper';

import { useRouter } from 'next/navigation';

import type { 
    UserInfo,
    RoomUsersObject
} from '@/types/interfaces';

import Dice from '@/components/ui/Dice';
import Map from '@/components/ui/Map';

type ParamsType = {
    id: string
}

interface RoomProps {
    params: ParamsType
}

const Room = ({ params }: RoomProps) => {
    
    const router = useRouter();

    const [ diceMax, setDiceMax ] = useState(4);
    const [ roomUsers, setRoomUsers ] = useState<UserInfo[]>([]);

    useEffect(() => {

        let userData = getUserData();

        if(userData == undefined || userData == null) {
            router.push('/');
            return;
        }
    
        socket.on('res_hello', (usersObject: RoomUsersObject) => {

            console.log(usersObject);

            let users: UserInfo[] = [];

            Object.keys(usersObject).map((key) => {

                let user: UserInfo = usersObject[key];
                users.push(user);
            });

            setRoomUsers(users);
        });

        socket.on('res_enter_room', (socketId: string) => {

            userData = getUserData();

            if(userData != undefined) {

                console.log(socketId);
                console.log(userData.character_name);
                console.log(userData.socket_id);

                if(userData.socket_id == undefined) {

                    let updateUser: UserInfo = {
                        socket_id: socketId,
                        character_name: userData.character_name,
                        room_code: userData.room_code,
                        position: userData.position,
                    };
        
                    updateUserData(updateUser);
                }
            }

            socket.emit('req_hello', {
                'room': params.id, 
                'user_data': JSON.stringify(userData)
            });
        });

        socket.emit('req_enter_room', {
            'room': params.id, 
            'user_data': JSON.stringify(userData)
        });

        socket.on('res_map_movement', (moveUser: UserInfo, usersObject: RoomUsersObject) => {
            
            if(moveUser.socket_id != undefined) {

                let users: UserInfo[] = [];

                Object.keys(usersObject).map((key) => {
                    let user: UserInfo = usersObject[key];

                    if(key === moveUser.socket_id) {
                        user = moveUser;
                    }
                    
                    users.push(user);
                });

                setRoomUsers(users);
            }
        });

        return () => {
            socket.off('res_hello');
            socket.off('res_enter_room');
            socket.off('res_map_movement');
        };
        
    }, [])

    return (
        <main className="flex flex-col w-screen h-screen bg-neutral-900">

            <div className='flex w-full gap-2 p-2 border-b border-neutral-800 bg-neutral-900 absolute rounded'>
                {roomUsers ? 
                    Object.values(roomUsers).map((user: UserInfo, index) => (
                        <div key={index} className='bg-neutral-800 p-2 rounded text-white'>
                            <span className='flex gap-2'>
                                <User className='bg-neutral-700 rounded-full p-1'/>{user.character_name}
                            </span>
                        </div>
                    )) 
                    : 
                    (
                        <span>Loading party...</span>
                    )
                }
            </div>
            
            <div className='flex justify-center w-full h-full'>

                <section id='map-section' className='flex justify-center items-center h-full w-2/3 border-r border-neutral-800 p-4'>
                    <Map roomUsers={roomUsers}/>
                </section>

                <section id="dice-section" className='flex flex-col justify-center items-center gap-2 w-1/3'>
                    <div className='flex flex-col gap-2'>
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
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Room;