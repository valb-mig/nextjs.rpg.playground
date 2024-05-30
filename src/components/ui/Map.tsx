import React from 'react';
import { socket } from "@/socket";
import { getUserData } from '@/utils/helper';

import { 
    User 
} from 'lucide-react';

import type { 
    UserInfo
} from '@/types/interfaces';

interface MapaProps {
    roomUsers: UserInfo[]
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

    return (
        <div className="grid grid-cols-10 w-full bg-blue-500 h-80 p-1 rounded">
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
            {Array.from({ length: columns }).map((_, colIndex) => (
                <div
                    key={colIndex}
                    className="flex items-center justify-center bg-gray-300 border border-blue-500 p-2 cursor-pointer h-full relative"
                    onClick={() => handleClick(rowIndex, colIndex)}
                >
                    { roomUsers.map((user) => 
                        user.position && (
                            user.position.row == rowIndex 
                                &&
                            user.position.col == colIndex
                        ) && (
                            <>
                                <span key={user.uuid} className='flex flex-col gap-1 text-white'>
                                    <User className='bg-neutral-700 rounded-full p-1'/>
                                </span>
                                <p className='absolute z-[1] bg-neutral-700 text-sm rounded text-white -bottom-1'>
                                    {user.character_name}
                                </p>
                            </>
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