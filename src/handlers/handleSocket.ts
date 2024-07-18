"use client";

import { socket } from "@/socket";
import { RoomContextProps } from "@/context/RoomContext";

import useSocket from "@hooks/useSocket";

const handleSocket = ( roomId: string, roomContext: RoomContextProps ) => {

  const { 
    setRoomCharacters,
    roomData,
    setRoomData
  } = roomContext;

  const { resHello, resEnterRoom, resMapMovement, resRollDice } = useSocket();

  socket.on( "res_hello", ( characterSocketObject: RoomCharacterSocketInfo ) => {

    let roomCharacters: CharacterSocketInfo[] = [];

    Object.keys(characterSocketObject).map((key) => {
      let user: CharacterSocketInfo = characterSocketObject[key];
      roomCharacters.push(user);
    });

    setRoomCharacters(roomCharacters);
  });

  // socket.on(
  //   "res_map_movement",
  //   (moveUser: UserInfo, usersObject: RoomUsersObject) => {
  //     setRoomUsers(resMapMovement(moveUser, usersObject));
  //   },
  // );

  socket.on("res_roll_dice", ( dice: number ) => {

    setRoomData({...roomData, dice: dice});
    // setRoomCharacters(roomCharacters); // Atualizar o responsavel pelo dado
  });

  // socket.on("res_gm_room_data", (data: { key: any; value: any }) => {
  //   setRoomData((prevRoomData) => ({
  //     ...prevRoomData,
  //     [data.key]: data.value,
  //   }));
  // });

  return () => {
    socket.off("res_hello");
    // socket.off("res_map_movement");
    // socket.off("res_roll_dice");
    // socket.off("res_gm_room_data");
  };
};

export default handleSocket;
