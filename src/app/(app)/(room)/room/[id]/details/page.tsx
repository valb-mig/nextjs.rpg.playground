"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRoomContext } from "@/context/RoomContext";
import useRoom from "@hooks/useRoom";

import Breadcrumbs from "@layout/Breadcrumbs";
import ToolBar from "@layout/ToolBar";
import Modal from "@layout/Modal";
import LoadingScreen from "@layout/LoadingScreen";

const Details = ({ params }: { params: {id: string} }) => {

  const { characterInfo, roomData, setCharacterInfo } = useRoomContext();
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

        setLoading(false);
      };

      if(!characterInfo) {

        console.log("Get character info");
        loadCharacterInfo();
      }

    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { characterInfo ? 
      (
        <div className="flex w-full justify-center">
          <div className="w-3/4">
            <Breadcrumbs  
              items={[
                { name: "Home", href: "/dashboard" }, 
                { name: "Room", href: "/room/"+params.id },
                { name: "Details" }
              ]}
            />
            <div className="flex h-full">
            </div>
          </div>
          <ToolBar.Details info={characterInfo} />
        </div>
      ):(
        <Modal.Root>
          <Modal.Header>
            <h1 className="text-foreground-1 text-3xl font-medium">
              Create a new character
              <p className="text-foreground-4 text-xs italic">
                Wellcome to room {roomData?.name}, you can create a new character here.
              </p>
            </h1>
          </Modal.Header>
        </Modal.Root>
      )}
    </>
  );
};

export default Details;