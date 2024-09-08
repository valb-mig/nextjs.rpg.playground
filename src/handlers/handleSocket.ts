"use client";

import { socket } from "@/socket";
import { RoomContextProps } from "@/context/RoomContext";

const handleSocket = ( 
  roomContext: RoomContextProps, 
) => {

  const { setRoomCharacters, setRoomData, setCharacterInfo } = roomContext;

  socket.on( "res_hello", ( characterSocketObject: RoomCharacterSocketInfo ) => {

    let roomCharacters: CharacterSocketInfo[] = [];

    Object.keys(characterSocketObject).map((key) => {
      let user: CharacterSocketInfo = characterSocketObject[key];
      roomCharacters.push(user);
    });
    
    setRoomCharacters(roomCharacters);
  });

  socket.on( "res_map_movement", (charachterSocektInfo: CharacterSocketInfo, otehrCharacters: RoomCharacterSocketInfo) => {

    let charactersRoom: CharacterSocketInfo[] = [];
    let updatedCharacterData;

    Object.keys(otehrCharacters).map((key) => {
      let user: CharacterSocketInfo = otehrCharacters[key];

      if (user.uuid === charachterSocektInfo.uuid) {
        user = charachterSocektInfo;
        updatedCharacterData = charachterSocektInfo
      }

      charactersRoom.push(user);
    });

    if(updatedCharacterData) {
      setCharacterInfo(updatedCharacterData);
    }

    setRoomCharacters(charactersRoom);
  });

  socket.on("res_roll_dice", ( characterSocketInfo: CharacterSocketInfo, dice: number ) => {

    if(characterSocketInfo.uuid) {
      setRoomData((prevRoomData: RoomSocketInfo | any) => ({
        ...prevRoomData, 
        dice: dice
      }));
    }
  });

  return () => {
    socket.off("res_hello");
    socket.off("res_map_movement");
    socket.off("res_roll_dice");
  };
};

export default handleSocket;
