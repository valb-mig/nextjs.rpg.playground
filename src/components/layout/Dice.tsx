"use client";

import { useRoomContext } from "@/context/RoomContext";

import { useState } from "react";
import { socket } from "@/socket";

const Dice = ({ max }: { max: number }) => {

  const { roomCharacters, setRoomCharacters } = useRoomContext();

  const [ diceNumber, setDiceNumber ] = useState(0);
  const [ diceRolling, setDiceRolling ] = useState(false);

  const rollDice = () => {

    setDiceRolling(true);

    const intervalId = setInterval(() => {
      socket.emit("req_roll_dice", max);
      clearInterval(intervalId);
    }, 500);
  };

  return (
    <>
      {!diceRolling ? (
        <div
          onClick={() => rollDice()}
          className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded text-6xl cursor-pointer select-none active:scale-110 text-black"
        >
          { diceNumber }
        </div>
      ) : (
        <div className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded animate-spin" />
      )}
    </>
  );
};

export default Dice;
