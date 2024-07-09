"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import useRoom from "@hooks/useRoom";

import Breadcrumbs from "@layout/Breadcrumbs";
import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";
import Modal from "@layout/Modal";

const Details = ({ params }: { params: {id: string} }) => {

  const [ loading, setLoading ] = useState(true);
  const [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>();
  const [ roomData, setRoomData ] = useState<RoomInfo>();
  const { getCharacterInfo, getRoomData } = useRoom(params.id);

  useEffect(() => {

    setLoading(true);

    try {
      
      const loadRoomData = async () => {
        
        const response = await getRoomData();
        
        console.log('TESTE: ', response);
        
        if ("error" in response) {
          toast.error(response.message);
        } else {
          setRoomData(response.data); 
        }
      };

      const loadCharacterInfo = async () => {

        const response = await getCharacterInfo();

        if ("error" in response) {
          toast.error(response.message);
        } else {
          setCharacterInfo(response.data); 
        }

        setLoading(false);
      };

      loadRoomData();
      loadCharacterInfo();

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
        )

      )}
    </>
  );
};

export default Details;