"use client";

import { useRoomContext } from "@/context/RoomContext";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

const Dice = ({ max }: { max: number }) => {

  const { characterInfo } = useRoomContext();
  const [ diceRolling, setDiceRolling ] = useState(false);

  const rollDice = () => {

    setDiceRolling(true);

    const intervalId = setInterval(() => {
      socket.emit("req_roll_dice",
        characterInfo,
        max
      );
      clearInterval(intervalId);
    }, 500);
  };

  useEffect(() => {

    if(!characterInfo?.dice) {
      return;
    }

    setDiceRolling(false);

  }, [characterInfo]);

  return (
    <>
      {!diceRolling ? (
        <div
          onClick={() => rollDice()}
          className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded-lg text-6xl cursor-pointer select-none active:scale-110 text-black"
        >
          { characterInfo?.dice ?? (<span className="text-sm font-bold">click to roll</span>) }
        </div>
      ) : (
        <div className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded-lg animate-spin" />
      )}
    </>
  );
};

export default Dice;
