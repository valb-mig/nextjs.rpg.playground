import React, { createContext, useContext, ReactNode, useState, FC } from "react";

interface RoomContextProps {
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