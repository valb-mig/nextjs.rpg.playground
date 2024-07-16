import { createContext, useContext, ReactNode, useState } from "react";

export interface RoomContextProps {
  characterInfo: CharacterSocketInfo | undefined;
  setCharacterInfo: (characterInfo: CharacterSocketInfo) => void;

  roomCharacters: CharacterSocketInfo[] | undefined;
  setRoomCharacters: (roomCharacters: CharacterSocketInfo[]) => void;

  roomData: RoomSocketInfo | undefined;
  setRoomData: (roomData: RoomSocketInfo) => void;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {

  const [ roomCharacters, setRoomCharacters ] = useState<CharacterSocketInfo[] | undefined>(undefined);
  const [ characterInfo, setCharacterInfo ] = useState<CharacterSocketInfo | undefined>(undefined);
  const [ roomData, setRoomData ] = useState<RoomSocketInfo | undefined>(undefined);

  console.log("Context");

  return (
    <RoomContext.Provider value={{ 
      characterInfo, 
      setCharacterInfo,

      roomCharacters,
      setRoomCharacters,

      roomData,
      setRoomData
    }}>
      { children }
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
    const context = useContext(RoomContext);
    if (!context) {
      throw new Error("useRoomContext must be used within a RoomProvider");
    }
    return context;
};