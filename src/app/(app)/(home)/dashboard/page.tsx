"use client";

import { useState, useEffect } from "react";
import useDashboard from "@hooks/useDashboard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { 
  Swords,
  DoorOpen,
  Copy,
  Home,
  Plus,
  Newspaper,
  LogIn,
  Calendar
} from "lucide-react";

import Input from "@ui/Input";
import Button from "@ui/Button";

import LoadingScreen from "@layout/LoadingScreen";

const Dashboard = () => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(true);
  const [ rooms, setRooms ] = useState<RoomInfo[]>([]);
  const [ search, setSearch ] = useState("");
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
          setLoading(false);
        }
      };

      loadUserRooms();
      
    } catch (error) {
      console.error(error);
    }

    getUserRooms();
  }, []);

  const searchedRooms = rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <LoadingScreen loading={loading} />

      <div className="flex flex-col w-full p-8">

        <div className="flex justify-between items-center w-full">
          <h1 className="flex gap-2 text-foreground-1 text-4xl items-center mb-5 font-medium">
            <Home className="text-primary size-10" />
            Characters
          </h1>

          <div className="flex gap-2 items-center">
            <Input name="search" placeholder="Room name" onChange={(e) => setSearch(e.target.value)} />
            <Button role="success" style="action" onClick={() => console.log("click")}>
              <Plus />
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-screen bg-background-default text-foreground-1">

          { rooms.length > 0 ? (

            <section className="flex flex-col gap-2 w-full">
              { searchedRooms.map((room, index) => (
                  <div id={room.id} key={index} className="w-full bg-shade-4 rounded-lg hover:scale-[1.02] transition-all duration-300 border-2 border-shade-4 cursor-pointer hover:border-primary">

                    <div className="flex justify-center items-center text-2xl font-medium w-full p-2 bg-shade-3 rounded-lg">
                      {room.name}
                    </div>

                    <div className="flex justify-between items-center w-full p-2">
                      <div className="flex gap-2 items-center">
                        <Swords className="text-primary w-7 h-7" />
                        <div className="text-sm font-medium">{room.character}</div>
                        <span role="tag" className="text-xs bg-shade-2 text-foreground-1 font-bold rounded-full p-1 px-2">{room.role}</span>
                      </div>
                      <Button role="default" style="button" onClick={() => router.push(`/dashboard/room/${room.room}/details`)}>
                        <Newspaper /> Details
                      </Button>
                    </div>

                    <hr className="border-shade-3 w-full" />

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col gap-2 items-start w-full p-2">
                        <div className="flex gap-2 items-center font-medium">
                          <DoorOpen className="text-primary size-7" />
                          Room
                          <div className="relative flex gap-2 items-center text-lg font-medium bg-shade-3 p-1 px-2 rounded-full z-50">
                            {room.room}
                            <Copy className="text-shade-2 size-4 hover:text-primary cursor-pointer" onClick={() => navigator.clipboard.writeText(room.room)} />
                          </div>
                        </div>

                        <div className="flex w-full justify-start items-center text-xs text-shade-1">
                          <Calendar className="size-4"/>&nbsp;<span className="italic">{ new Date(room.created_at).toLocaleString( "pt-BR", { dateStyle: "short", timeStyle: "short" } ) }</span>                       
                        </div>
                      </div>
                      <div className="flex gap-2 items-center p-2">
                        <Button role="success" style="button" onClick={ () => router.push(`/room/${room.room}`) }>
                          <LogIn className="size-4" /> Join
                        </Button>
                      </div>
                    </div>
                  
                  </div>
              ))}
            </section>

          ):(
            <p>No rooms found</p>
          )}
        </div>
      </div>
    </>
    
  );
};

export default Dashboard;
