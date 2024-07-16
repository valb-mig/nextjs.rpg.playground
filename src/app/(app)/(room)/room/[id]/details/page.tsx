"use client";

import { useRoomContext } from "@/context/RoomContext";

import Breadcrumbs from "@layout/Breadcrumbs";
import ToolBar from "@layout/ToolBar";
import Modal from "@layout/Modal";

const Details = ({ params }: { params: {id: string} }) => {

  const { characterInfo, roomData } = useRoomContext();

  return (
    <>
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