import React, { useState, useEffect } from 'react';
import { socket } from "@/socket";

import { 
    getUserData
} from '@/utils/helper';

import type { 
    UserInfo,
    RoomUsersObject
} from '@/types/interfaces';

interface DiceProps {
    room: string,
    max: number
}

const Dice = ({ room, max }: DiceProps) => {

    const [diceNumber, setDiceNumber] = useState(0);
    const [diceRolling, setDiceRolling] = useState(false);

    useEffect(() => {

        socket.on('res_roll_dice', (usersObject: RoomUsersObject, rollUser: UserInfo) => {
            setDiceRolling(true);

            const intervalId = setInterval(() => {
                setDiceNumber(rollUser.dice ? rollUser.dice : 0);
                setDiceRolling(false);
                clearInterval(intervalId);
            }, 500)
        });

        return () => {
            socket.off('res_roll_dice');
        };

    }, []);

    const rollDice = () => {

        let userData = getUserData();

        if(userData != undefined) {
            
            setDiceRolling(true);

            const intervalId = setInterval(() => {
                socket.emit('req_roll_dice', {
                    room: room, 
                    max:  max, 
                    user_data: JSON.stringify(userData)
                });
                clearInterval(intervalId);
            }, 500);
        }
    }

    return (
        <>
            {!diceRolling ? (
                <div
                    onClick={() => rollDice()}
                    className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded text-6xl cursor-pointer select-none active:scale-110"
                >
                    {diceNumber}
                </div>
            ) : (
                <div className='flex justify-center items-center bg-neutral-50 w-40 h-40 rounded animate-spin'>
                </div>
            )}
        </>
    );
}

export default Dice;
