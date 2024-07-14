import { createContext, useContext, ReactNode, useState } from "react";

export interface RoomContextProps {
  characterInfo: CharacterInfo | undefined;
  setCharacterInfo: (characterInfo: CharacterInfo) => void;

  roomCharacters: CharacterSocketInfo[] | undefined;
  setRoomCharacters: (roomCharacters: CharacterSocketInfo[]) => void;

  roomData: RoomInfo | undefined;
  setRoomData: (roomData: RoomInfo) => void;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {

  const [ roomCharacters, setRoomCharacters ] = useState<CharacterSocketInfo[] | undefined>(undefined);
  const [ characterInfo, setCharacterInfo ] = useState<CharacterInfo | undefined>(undefined);
  const [ roomData, setRoomData ] = useState<RoomInfo | undefined>(undefined);

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