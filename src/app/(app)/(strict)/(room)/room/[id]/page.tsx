"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { 
  DoorOpen, 
  User,
  MapIcon,
  NotepadText
} from "lucide-react";

import { useRoomContext } from "@/context/RoomContext";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import handleSocket from "@/handlers/handleSocket";

import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";
import Map from "@/components/layout/Map";
import Button from "@/components/ui/Button";

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

    setLoading(true);

    const loadPageData = async () => {

      const loadRoomData = async () => {

        const response = await getRoomData();
  
        if(response.message) {
          toast[response.status](response.message);
        }
  
        if(response.data) {
          setRoomData(response.data);
        }
      }
  
      const loadCharacterInfo = async () => {
        
        const response = await getCharacterInfo();
  
        if(response.message) {
          toast[response.status](response.message);
        }
  
        if (response.data) {
          socket.emit("req_enter_room", params.id, response.data);
          setCharacterInfo(response.data);
        }
  
        setLoading(false);
      };
    
      await loadCharacterInfo();
      await loadRoomData();
    }
    
    loadPageData();

    /* Sockets */
    handleSocket(roomContext);
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { !loading && characterInfo && roomData && (
        <div className="flex w-full">

          <div role="content" className="flex flex-col gap-4 w-full p-2">

            <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
              <DoorOpen className="text-primary size-10" />
              { roomData.name }
            </h2>

            <div className="flex gap-2 w-full">
              { roomCharacters && roomCharacters.map((character: CharacterSocketInfo, index: number) => (
                <span key={index} className="relative flex gap-2 flex-col w-fit items-center min-w-fit p-2 rounded-lg bg-shade-4 group">
                  
                  <div className="flex items-center gap-2">

                    <div className="flex items-center gap-2">
                      <User className="size-7 border border-shade-3 p-1 rounded-full" />
                      <p className="text-center text-xs sm:text-sm font-bold">{character.name}</p>
                    </div>

                    <span className={`font-bold px-2 rounded-full ${character.role === 'gm' ? 'bg-yellow-500 text-yellow-100' : 'bg-shade-3'} `}>
                      {character.role}
                    </span>

                  </div>

                  <div className="flex flex-col w-full gap-2">

                    { character.role !== "gm" && (
                      <>
                        <div className="flex w-full gap-2 font-medium">
                          <span className="bg-shade-3 px-2 rounded-full">hp</span>
                          <p className="text-success">
                            {character.life}<span className="text-shade-3 text-xs">/100</span>
                          </p>
                        </div>

                        <div className="flex w-full gap-2 font-medium">
                          <span className="bg-shade-3 px-2 rounded-full">xp</span> 
                          <p className="text-primary">
                            {character.xp}<span className="text-shade-3 text-xs">/100</span>
                          </p>
                        </div>
                      </>
                    )}

                    {/* [INFO] Don't show gm's dice  */}

                    { character.dice && character.role !== "gm" && (
                      <div className="absolute -bottom-2 -right-2 size-6 flex justify-center items-center bg-white text-black rounded-lg text-xs font-bold">
                        { character.dice }
                      </div>
                    )}

                  </div>
                  
                  <Button 
                    style="action" 
                    role="info" 
                    className="absolute -bottom-2 -right-2 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                    onClick={() => console.log('Details')}
                  >
                    <NotepadText />
                  </Button>

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

          <ToolBar.Room />
        </div>
      )}

    </>
  );
};

export default Room;
