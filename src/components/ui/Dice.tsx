import React, { useState, useEffect } from 'react';
import { socket } from "@/socket";
interface DiceProps {
    max: number
}

const Dice = ({ max }: DiceProps) => {

    const [diceNumber, setDiceNumber] = useState(0);
    const [diceRolling, setDiceRolling] = useState(false);

    useEffect(() => {
        socket.on('diceRoll', (newNumber: number) => {
            setDiceNumber(newNumber);
            setDiceRolling(false);
        });

        return () => {
            socket.off('diceRoll');
        };
    }, []);

    const rollDice = () => {
        setDiceRolling(true);

        const intervalId = setInterval(() => {
            socket.emit('rollDice', max);
            clearInterval(intervalId);
        }, 1000);
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
