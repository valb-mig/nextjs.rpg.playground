"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { User } from "lucide-react";
import { useRoomContext } from "@/context/RoomContext";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import handleSocket from "@/handlers/handleSocket";

import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";

const Room = ({ params }: { params: { id: string} }) => {

  const roomContext = useRoomContext();

  const { characterInfo, setCharacterInfo, roomCharacters } = roomContext;
  const [ loading, setLoading ] = useState(false);
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

      if(!characterInfo) {
        loadCharacterInfo();
      }
  
      /* Sockets */
      handleSocket(params.id, roomContext);

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
            <div className="flex flex-col w-3/4 justify-between">

              <div className="flex gap-2 w-full p-2 overflow-x-scroll">

                { roomCharacters && roomCharacters.map((character: CharacterSocketInfo, index: number) => (
                  <div key={index} className="flex w-fit items-center min-w-fit bg-shade-4 pr-2 gap-2 rounded-full h-7">
                    <User className="w-7 h-7 border border-shade-3 p-1 rounded-full" />
                    <p className="text-center text-xs sm:text-sm font-bold">{character.name}</p>

                    { character.dice && (
                      <span className="block size-8 bg-white text-center text-black rounded">
                        { character.dice }
                      </span>
                    )}
                  </div>
                ))}

              </div>

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
