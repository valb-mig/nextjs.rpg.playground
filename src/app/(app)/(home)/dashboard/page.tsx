"use client";

import { useState, useEffect } from "react";
import useDashboard from "@hooks/useDashboard";
import { toast } from "sonner";

import { LoaderIcon } from "lucide-react";

const Dashboard = () => {

  const [ loading, setLoading ] = useState(true);
  const [ rooms, setRooms ] = useState<RoomInfo[]>([]);
  const { getUserRooms } = useDashboard();

  useEffect(() => {

    setLoading(true);

    try {
      
      const loadUserRooms = async () => {

        const response = await getUserRooms();

        if ("message" in response) {
          toast.error(response.message);
        } else {
          setRooms(response);
        }
      };

      loadUserRooms();
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    getUserRooms();
  }, []);

  return (
    <>
      { loading && (
        <div 
          className="absolute h-screen w-screen flex items-center justify-center backdrop-blur-lg bg-transparent" 
          popover="auto"
        >
          <LoaderIcon className="text-primary h-12 w-12 animate-spin" />
        </div>
      )}

      <div className="flex flex-col w-screen h-screen bg-background-default text-foreground-1">

        {!loading && rooms.length > 0 ? (

          <li className="flex flex-col gap-2">

            { rooms.map((room, index) => (
              <ul id={room.id} key={index} className="flex flex-row gap-2 items-center">
                <div className="flex flex-col">
                  <div className="text-sm font-medium">{room.character}</div>
                  <div className="text-xs text-gray-500">{room.role}</div>
                </div>
              </ul>
            ))}

          </li>

        ):(
          <p>No rooms found</p>
        )}
      </div>
    </>
    
  );
};

export default Dashboard;
