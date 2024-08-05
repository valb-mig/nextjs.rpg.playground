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
  Plus,
  Newspaper,
  LogIn,
  Calendar,
  Search,
  X,
  Filter
} from "lucide-react";

import Form from "@ui/Form";
import Input from "@ui/Input";
import Button from "@ui/Button";
import Modal from "@layout/Modal";
import LoadingScreen from "@layout/LoadingScreen";

import useHome from "@hooks/useHome";

const Home = () => {
  
  const router = useRouter();

  const [ loading, setLoading ] = useState(true);
  const [ rooms, setRooms ] = useState<UserRoomsData[]>([]);
  const [ roomModal, setRoomModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const { getUserRooms, checkRoom } = useHome();

  const ZodSchema = z.object({
    room: z.string().min(1, "Room code is required")
  });

  const onFormSubmit = async (data: { room: string }) => {

    let response = await checkRoom(data.room);
    
    toast[response.status](response.message);

    if (response.status === "success") {
      router.push(`/room/${data.room}/details`);
      setRoomModal(false);
    }
  };

  useEffect(() => {

    setLoading(true);

    const loadUserRooms = async () => {

      const response = await getUserRooms();

      if(response.message) {
        toast[response.status](response.message);
      }

      if(response.status === "success" && response.data) {
        setRooms(response.data);
        setLoading(false);
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
      <LoadingScreen loading={loading} />

      { roomModal && (
        <Modal.Root>

          <Modal.Header>
            <h1 className="text-foreground-1 text-3xl font-medium">
              Enter a room
            </h1>
            <button onClick={() => setRoomModal(false)} className="text-foreground-1 text-2xl font-medium">
              <X />
            </button>
          </Modal.Header>

          <Modal.Body>
            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema}>
              <div className="flex w-full gap-2">
                <Form.Input label="Room code" name="room" type="text" autofocus>
                  <Search />
                </Form.Input>
                <Button type="submit" role="success" style="button" className="h-12">
                  <LogIn/>
                  Join
                </Button>
              </div>
            </Form.Body>
          </Modal.Body>

        </Modal.Root>
      )}

      <div className="flex flex-col w-full p-8">

        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
            <PartyPopper className="text-primary size-10" />
            Your party&apos;s
          </h1>

          <div className="flex gap-2 items-center w-1/2">
            <Input 
              name="filter" 
              placeholder="Filter rooms"
              onChange={(e) => setSearch(e.target.value)}
              style="secondary"
            >
              <Filter className="text-shade-4" />
            </Input>

            <Button role="success" style="action" onClick={() => setRoomModal(!roomModal)}>
              <Plus />
            </Button>
          </div>
        </div>

        <div className="flex flex-col bg-background-default text-foreground-1">

          { rooms.length > 0 ? (

            <section className="flex flex-col gap-2 w-full">
              { filteredRooms.map((room, index) => (
                  <div id={room.id} key={index} className="w-full bg-shade-4 rounded-lg hover:scale-[1.02] transition-all duration-300 border-2 border-shade-4  hover:border-primary">

                    <div className="flex justify-between items-center w-full p-2">

                      <span className="flex justify-center text-2xl font-medium text-primary">
                        {room.name}
                      </span>

                      <div className="flex gap-2 items-center">
                        <Swords className="text-primary size-7" />
                        <div className="text-sm font-medium">{room.character}</div>
                        <span role="tag" className="text-xs bg-shade-2 text-foreground-1 font-bold rounded-full p-1 px-2">{room.role}</span>
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
            <p>No rooms found</p>
          )}
        </div>
      </div>
    </>
    
  );
};

export default Home;
