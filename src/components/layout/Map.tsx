"use client";

import React from 'react';

import { socket } from "@/socket";
import { getUserData } from '@/handlers/handleUser';

import { 
    User 
} from 'lucide-react';

import type { 
    UserInfo
} from '@/types';

interface MapaProps {
    roomUsers: UserInfo[],
    userData?: UserInfo
}

const Mapa = ({ roomUsers, userData = getUserData() }: MapaProps) => {

    const handleClick = (row: number, col: number) => {

        let clientUserData = getUserData();

        if(clientUserData != undefined) {

            socket.emit('req_map_movement', {
                uuid: clientUserData?.uuid,
                character_name: clientUserData?.character_name,
                room_code: clientUserData.room_code,
                dice: clientUserData?.dice,
                role: clientUserData?.role,
                position: clientUserData?.position

            } as UserInfo, row, col);
        }
    };

    return (
        <div className="grid grid-cols-10 w-full bg-neutral-900 h-full p-1 rounded">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
            {Array.from({ length: 5 }).map((_, colIndex) => (
                <div
                    key={colIndex}
                    className="relative flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 border-2 border-neutral-900 p-2 cursor-pointer rounded-lg size-full"
                    onClick={() => handleClick(rowIndex, colIndex)}
                >
                    <span key={rowIndex+colIndex} className='absolute text-neutral-900 text-sm font-bold'>{rowIndex} x {colIndex}</span>

                    { roomUsers.map((user) => 
                        user.position && (
                            user.position.row == rowIndex 
                                &&
                            user.position.col == colIndex
                        ) && (
                            <span key={user.uuid} className='flex justify-center relative items-center'>
                                <div className='flex flex-col relative gap-1 text-white'>
                                    <User className={`rounded-full p-1 ${userData?.uuid == user.uuid ? "bg-emerald-700" : "bg-neutral-700"}`}/>
                                </div>
                                <p className={`absolute z-[1] text-sm rounded text-white -bottom-6 truncate px-2 ${userData?.uuid == user.uuid ? "bg-emerald-700" : "bg-neutral-700"}`}>
                                    {user.character_name}
                                </p>
                            </span>
                        )
                    )}
                </div>
            ))}
            </div>
        ))}
        </div>
    );
};

export default Mapa;