"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { z } from "zod";

import { 
  Swords,
  DoorOpen,
  Copy,
  PartyPopper,
  LogIn,
  Calendar,
  Search,
  Filter,
  Cloud,
  LoaderIcon,
  PackageOpen
} from "lucide-react";

import Form from "@ui/Form";
import Input from "@ui/Input";
import Button from "@ui/Button";
import LoadingScreen from "@layout/LoadingScreen";

import useHome from "@hooks/useHome";

const Home = () => {
  
  const router = useRouter();

  const [ loading, setLoading ] = useState({
    page: false,
    find: false
  });

  const [ rooms, setRooms ] = useState<UserRoomsData[]>([]);
  const [ roomModal, setRoomModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const { getUserRooms, checkRoom } = useHome();

  const ZodSchema = z.object({
    room: z.string().min(1, "Room code is required")
  });

  const onFormSubmit = async (data: { room: string }) => {

    setLoading({ ...loading, find: true });

    try {
      let response = await checkRoom(data.room);
    
      if(response.message) {
        toast[response.status](response.message);
      }
  
      if (response.status === "success") {
        router.push(`/room/${data.room}`);
        setRoomModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ ...loading, find: false });
    }
  };

  useEffect(() => {

    setLoading({ ...loading, page: true });

    const loadUserRooms = async () => {

      const response = await getUserRooms();

      if(response.message) {
        toast[response.status](response.message);
      }

      if(response.status === "success" && response.data) {
        setRooms(response.data);
        setLoading({ ...loading, page: false });
      }
    };

    try {
      loadUserRooms();
    } catch (error) {
      console.error(error);
    }
    
  }, []);

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <LoadingScreen loading={loading.page} />

      <div className="flex flex-col w-full p-8 gap-16">
        <section id="find-room" className="relative flex flex-col gap-2 items-center justify-center h-1/3">

          <div className="relative">

            <div className="flex flex-col gap-4 justify-center items-center relative z-10">
              <div className="text-center">
                <h1 className="text-4xl font-medium">Find a Room</h1>
                <p className="text-sm">Join a party and connect with others in a room</p>
              </div>

              <Form.Body onSubmit={onFormSubmit} schema={ZodSchema}>
                <Form.Input 
                  name="room" 
                  type="text" 
                  style="primary"
                  placeholder="Room code"
                  autofocus
                >
                  {loading.find ? (
                    <LoaderIcon className="text-primary animate-spin" />
                  ):(
                    <Search className="text-shade-3" />                    
                  )}
                </Form.Input>
                <button type="submit" className="hidden"></button>
              </Form.Body>
            </div>

            <Cloud className="text-primary size-32 absolute -top-10 right-0 z-0 opacity-20" />
          </div>
          {/* <Button role="success" style="action" onClick={() => setRoomModal(!roomModal)}>
            <Plus />
          </Button> */}          
          <div className="block bg-primary blur-[100px] size-[700px] rounded-full absolute top-0 opacity-5 transition-all z-0"></div>
        </section>

        <section id="party-rooms" className="relative z-10 h-2/3">
          <div className="flex justify-between items-center w-full mb-5">
            <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
              <PartyPopper className="text-primary size-10" />
              Your party&apos;s
            </h2>

            <div className="flex gap-2 items-center w-1/4">
              <Input 
                name="filter" 
                placeholder="Filter rooms"
                onChange={(e) => setSearch(e.target.value)}
                style="secondary"
              >
                <Filter className="text-shade-3" />
              </Input>
            </div>
          </div>
          <div className="text-foreground-1">

            { rooms.length > 0 ? (

              <section className="flex flex-col gap-2 w-full">

                { filteredRooms.map((room, index) => (
                  <div id={room.id} key={index} className="w-full bg-shade-4 rounded-lg hover:scale-[1.02] transition-all duration-75 border-2 border-shade-4  hover:border-primary">

                    <div className="flex justify-between items-center w-full p-2">

                      <span className="flex justify-center text-2xl font-medium text-primary">
                        {room.name}
                      </span>

                      <div className="flex gap-2 items-center">
                        <Swords className="text-primary size-7" />
                        <div className="text-sm font-medium">{room.character}</div>
                        <span role="tag" className={`text-xs ${room.role == 'gm' ? 'bg-yellow-600 text-yellow-100' : 'bg-shade-2 text-foreground-1'} font-bold rounded-full p-1 px-2`}>{room.role}</span>
                      </div>
                    </div>

                    <hr className="border-shade-3 w-full" />

                    <div className="flex w-full justify-between">
                      <div className="flex flex-col gap-2 items-start w-full p-2">
                        <div className="flex gap-2 items-center font-medium">
                          <DoorOpen className="text-primary size-7" />
                          Room
                          <div className="relative flex gap-2 items-center text-xs font-medium bg-shade-3 p-1 px-2 rounded-full">
                            {room.room}
                            <Copy className="text-shade-2 size-4 hover:text-primary cursor-pointer" onClick={() => { navigator.clipboard.writeText(room.room); toast.success("Copied to clipboard") }} />
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
              <div className="flex w-full justify-center items-center mt-16">
                <span className="flex flex-col justify-center items-center text-shade-3">
                  <PackageOpen className="size-16"/>
                  <p className="text-lg font-bold">No parties found</p>
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
    
  );
};

export default Home;
