import React, { useState, useEffect } from 'react';
import { socket } from "@/socket";
import { getUserData } from '@/utils/helper';

import { icons } from 'lucide-react';

import type { 
    UserInfo,
    RoomUsersObject
} from '@/types/interfaces';

interface MapaProps {
    roomUsers: RoomUsersObject
}

const Mapa = ({ roomUsers }: MapaProps) => {

    const rows = 10;
    const columns = 5;

    const handleClick = (row: number, col: number) => {
        socket.emit('req_map_movement', {
            'user_data': JSON.stringify(getUserData()),
            'row':row,
            'col':col
        });
    };

    useEffect(() => {

        socket.on('res_map_movement', (moveUser: any) => {
            console.log('Mover', moveUser);
        })

        return () => {
            socket.off('res_map_movement');
        };
    }, []);

    return (
        <div className="grid grid-cols-10 w-full bg-blue-500 h-80 p-1 rounded">
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
            {Array.from({ length: columns }).map((_, colIndex) => (
                <div
                key={colIndex}
                className="flex items-center justify-center bg-gray-300 border border-blue-500 p-2 cursor-pointer h-full"
                onClick={() => handleClick(rowIndex, colIndex)}
                >
                </div>
            ))}
            </div>
        ))}
        </div>
    );
};

export default Mapa;