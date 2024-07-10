"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import handleSocket from "@/handlers/handleSocket";

import Breadcrumbs from "@layout/Breadcrumbs";
import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";

const Room = ({ params }: { params: {id: string} }) => {

  const [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>();
  const [ roomCharacters, setRoomCharacters ] = useState<CharacterSocketInfo[]>([]);
  
  const [ loading, setLoading ] = useState(false);

  const [roomData, setRoomData] = useState<RoomData>({
    location: "https://i.imgur.com/krXmihl.jpeg",
    showcase: "https://i.imgur.com/vElW0OZg.jpg",
  });

  const { getCharacterInfo } = useRoom(params.id);

  useEffect(() => {

    setLoading(true);

    try {
      const loadCharacterInfo = async () => {

        const response = await getCharacterInfo();

        if (response.status === "error") {
          toast.error(response.message);
        } else {
          setCharacterInfo(response.data); 
          toast.info("Character info loaded");
        }

        socket.emit("req_enter_room", params.id, response.data);

        setLoading(false);
      };

      loadCharacterInfo();
  
      /* Sockets */
      handleSocket({ setRoomCharacters, setRoomData, roomData, params });

    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { !loading && (

        characterInfo ? 
        (
          <div className="flex w-full justify-center">
            <div className="w-3/4">

              {roomCharacters && roomCharacters.map((character: CharacterInfo, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-center text-xl font-bold">{character.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-center text-xl font-bold">Life: {character.life}</p>
                    <p className="text-center text-xl font-bold">Gold: {character.gold}</p>
                    <p className="text-center text-xl font-bold">Age: {character.age}</p>
                  </div>
                </div>
              ))}

              <div className="flex h-full">
              </div>
            </div>
            <ToolBar.Room info={characterInfo} />
          </div>
        ):(
          <>No Way</>
        )
      )}
    </>
  );
};

export default Room;
