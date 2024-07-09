"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import { getUserCookies } from "@/handlers/handleCookie";
import handleSocket from "@/handlers/handleSocket";

import Breadcrumbs from "@layout/Breadcrumbs";
import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";
import Modal from "@layout/Modal";

const Room = ({ params }: { params: {id: string} }) => {

  const [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>();

  const [ diceMax, setDiceMax ] = useState(4);
  const [ roomCharacters, setRoomCharacters ] = useState<UserInfo[]>([]);
  const [ loading, setLoading ] = useState(false);

  const [roomData, setRoomData] = useState<RoomData>({
    location: "https://i.imgur.com/krXmihl.jpeg",
    showcase: "https://i.imgur.com/vElW0OZg.jpg",
  });

  const [roomLocation, setRoomLocation] = useState("");
  const [roomShowcase, setRoomShowcase] = useState("");

  const { getCharacterInfo } = useRoom(params.id);

  useEffect(() => {

    setLoading(true);

    try {

      const loadUserInfo = async () => {

        const response = await getUserCookies();

        if(!response) {
          toast.error("Invalid cookies");
          return;
        }
      };

      const loadCharacterInfo = async () => {

        const response = await getCharacterInfo();

        if ("error" in response) {
          toast.error(response.message);
        } else {
          setCharacterInfo(response.data); 
        }

        // socket.emit("req_enter_room", response.data);

        setLoading(false);
      };

      loadCharacterInfo();
  
      /* Sockets */
      // handleSocket({ setRoomCharacters, setRoomData, roomData, params });

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
              <Breadcrumbs  
                items={[
                  { name: "Home", href: "/dashboard" }, 
                  { name: "Room" }
                ]}
              />
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
