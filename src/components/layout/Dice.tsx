"use client";

import React, { useState, useEffect } from "react";
import { socket } from "@/socket";

const Dice = ({ max }: { max: number }) => {
  const [diceNumber, setDiceNumber] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);

  useEffect(() => {
    socket.on(
      "res_roll_dice",
      (rollUser: UserInfo, usersObject: RoomUsersObject) => {
        setDiceRolling(true);

        const intervalId = setInterval(() => {
          setDiceNumber(rollUser.dice ? rollUser.dice : 0);
          setDiceRolling(false);
          clearInterval(intervalId);
        }, 500);
      },
    );

    return () => {
      socket.off("res_roll_dice");
    };
  }, []);

  const rollDice = () => {
    let userData = getUserData();

    if (userData != undefined) {
      setDiceRolling(true);

      const intervalId = setInterval(() => {
        socket.emit(
          "req_roll_dice",
          {
            uuid: userData?.uuid,
            character_name: userData?.character_name,
            room_code: userData.room_code,
            dice: userData?.dice,
            role: userData?.role,
            position: userData?.position,
          } as UserInfo,
          max,
        );
        clearInterval(intervalId);
      }, 500);
    }
  };

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
        <div className="flex justify-center items-center bg-neutral-50 w-40 h-40 rounded animate-spin"></div>
      )}
    </>
  );
};

export default Dice;
