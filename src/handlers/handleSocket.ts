import { socket } from "@/socket";
import { RoomContextProps } from "@/context/RoomContext";

import { getUserCookies } from "@utils/cookies";

const handleSocket = ( 
  roomContext: RoomContextProps, 
) => {

  const { setRoomCharacters, setCharacterInfo } = roomContext;

  socket.on( "res_hello", ( characterSocketObject: RoomCharacterSocketInfo ) => {

    let roomCharacters: CharacterSocketInfo[] = [];

    Object.keys(characterSocketObject).map((key) => {
      let user: CharacterSocketInfo = characterSocketObject[key];
      roomCharacters.push(user);
    });
    
    setRoomCharacters(roomCharacters);
  });

  socket.on( "res_map_movement", async (characterSocektInfo: CharacterSocketInfo, otherCharacters: RoomCharacterSocketInfo) => {
    updateCharactersRoomData(characterSocektInfo, otherCharacters);
  });

  socket.on("res_roll_dice", async (characterSocektInfo: CharacterSocketInfo, otherCharacters: RoomCharacterSocketInfo) => {
    updateCharactersRoomData(characterSocektInfo, otherCharacters);
  });

  const updateCharactersRoomData = async (characterSocektInfo: CharacterSocketInfo, otherCharacters: RoomCharacterSocketInfo) => {

    const cookieData = await getUserCookies();

    let updatedCharactersRoom: CharacterSocketInfo[] = [];

    // [INFO] Updating all characters array
    Object.keys(otherCharacters).map((key) => {
      let currentUser: CharacterSocketInfo = otherCharacters[key];

      // [INFO] Veryfies if the user from socket is the same on the client

      if (currentUser.uuid === characterSocektInfo.uuid) {
        currentUser = characterSocektInfo;
      }
      
      updatedCharactersRoom.push(currentUser);
    });

    // [TODO] Update position on context

    if(characterSocektInfo.uuid === cookieData?.uuid) {
      setCharacterInfo(characterSocektInfo);
    }

    setRoomCharacters(updatedCharactersRoom);
  }

  return () => {
    socket.off("res_hello");
    socket.off("res_map_movement");
    socket.off("res_roll_dice");
  };
};

export default handleSocket;
