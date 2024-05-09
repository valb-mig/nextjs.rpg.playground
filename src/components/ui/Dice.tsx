import React, { useState, useEffect } from 'react';
import { socket } from "@/socket";

interface DiceProps {
    room: string,
    max: number
}

const Dice = ({ room, max }: DiceProps) => {

    const [diceNumber, setDiceNumber] = useState(0);
    const [diceRolling, setDiceRolling] = useState(false);

    useEffect(() => {
        socket.on('res_roll_dice', (newNumber: number) => {
            setDiceRolling(true);

            const intervalId = setInterval(() => {
                setDiceNumber(newNumber);
                setDiceRolling(false);
                clearInterval(intervalId);
            }, 500)
        });

        return () => {
            socket.off('res_roll_dice');
        };
    }, []);

    const rollDice = () => {
        setDiceRolling(true);

        const intervalId = setInterval(() => {
            socket.emit('req_roll_dice', {room, max});
            clearInterval(intervalId);
        }, 500);
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
                    {/* Pode colocar uma animação de rolagem aqui se desejar */}
                </div>
            )}
        </>
    );
}

export default Dice;
