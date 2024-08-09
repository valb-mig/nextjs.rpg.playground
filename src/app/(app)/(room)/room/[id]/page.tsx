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

    const loadCharacterInfo = async () => {
      
      setLoading(true);
  
      try {
        const response = await getCharacterInfo();
  
        if (response.status === "error" || !response.data) {
          toast.error(response.message);
        } else {
          socket.emit("req_enter_room", params.id, response.data);
          setCharacterInfo(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    loadCharacterInfo();

    /* Sockets */
    handleSocket(params.id, roomContext);

  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { !loading && (

        characterInfo ? 
        (
          <div className="flex w-full">

            <div role="content" className="w-full">

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
