import { socket } from "@/socket";
import { RoomContextProps } from "@/context/RoomContext";
import { getUserCookies } from "@/utils/cookies";

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

  socket.on( "res_map_movement", (charachterSocektInfo: CharacterSocketInfo, otherCharacters: RoomCharacterSocketInfo) => {

    let charactersRoom: CharacterSocketInfo[] = [];

    Object.keys(otherCharacters).map((key) => {
      let currentUser: CharacterSocketInfo = otherCharacters[key];

      // [INFO] Veryfies if the user from socket is the same on the client

      if (currentUser.uuid === charachterSocektInfo.uuid) {
        currentUser = charachterSocektInfo;
      }

      charactersRoom.push(currentUser);
    });

    // [TODO] Update position on context

    // if(charachterSocektInfo.uuid) {
    //   setCharacterInfo(); // Update de context of the client
    // }

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
