"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { 
  DoorOpen, 
  User,
  MapIcon
} from "lucide-react";
import { useRoomContext } from "@/context/RoomContext";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import handleSocket from "@/handlers/handleSocket";

import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";
import Map from "@/components/layout/Map";

const Room = ({ params }: { params: { id: string} }) => {

  const roomContext = useRoomContext();

  const { 
    characterInfo, 
    setCharacterInfo, 
    roomCharacters, 
    roomData,
    setRoomData
  } = roomContext;
  
  const [ loading, setLoading ] = useState(false);
  const { getCharacterInfo, getRoomData } = useRoom(params.id);

  useEffect(() => {

    const loadRoomData = async () => {

      setLoading(true);

      try {
        const response = await getRoomData();

        if (response.status === "error" || !response.data) {
          toast.error(response.message);
        } else {
          setRoomData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const loadCharacterInfo = async () => {
      
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
    loadRoomData();

    /* Sockets */
    handleSocket(roomContext);

  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />
      { !loading && characterInfo && roomData &&  (
        <div className="flex w-full">

          <div role="content" className="flex flex-col gap-4 w-full p-2">

            <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
              <DoorOpen className="text-primary size-10" />
              { roomData.name }
            </h2>

            <div className="flex gap-2 w-full">
              { roomCharacters && roomCharacters.map((character: CharacterSocketInfo, index: number) => (
                <span key={index} className="relative flex gap-2 flex-col w-fit items-center min-w-fit bg-shade-4 p-2 rounded-lg">
                  
                  <div className="flex items-center gap-2">
                    <User className="size-7 border border-shade-3 p-1 rounded-full" />
                    <p className="text-center text-xs sm:text-sm font-bold">{character.name}</p>
                  </div>

                  <div className="flex flex-col w-full gap-2">

                    <div className="flex w-full gap-2 font-medium">
                      <span className="bg-shade-3 px-2 rounded-full">hp</span>
                      <p className="text-success">100</p>
                    </div>

                    <div className="flex w-full gap-2 font-medium">
                      <span className="bg-shade-3 px-2 rounded-full">xp</span> 
                      <p className="text-primary">1</p>
                    </div>

                    { character.dice && (
                      <div className="absolute -bottom-2 -right-2 size-6 flex justify-center items-center bg-white text-black rounded-lg text-xs font-bold">
                        { character.dice }
                      </div>
                    )}

                  </div>
                  
                </span>
              ))}
            </div>

            <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
              <MapIcon className="text-primary size-10" />
              Map
            </h2>

            <div role="map" className="bg-shade-4 rounded-lg p-2">
              <Map />
            </div>

          </div>

          <ToolBar.Room info={characterInfo} />
        </div>
      )}
    </>
  );
};

export default Room;
