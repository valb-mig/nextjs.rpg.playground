"use client";

import { useEffect, useState } from "react";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Form from "@/components/ui/Form";
import { z } from "zod";

import { 
  Boxes,
  Calendar,
  Copy,
  DoorOpen,
  Filter,
  LoaderIcon, 
  LogIn, 
  PackageOpen, 
  X
} from "lucide-react";

import Button from "@/components/ui/Button";
import Modal from "@/components/layout/Modal";
import useRooms from "@/hooks/useRooms";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";

const Rooms = () => {

  const router = useRouter();

  const { createRoom, getPublicRooms } = useRooms();

  const [ modalForm, showModalForm ] = useState(false);
  const [ publicRooms, setPublicRooms ] = useState<RoomInfo[]>([]);
  const [ search, setSearch ] = useState("");
  const [ loading, setLoading ] = useState({
    page: false,
    form: false
  });

  const onFormSubmit = async ( data: { 
    privacy: 'PUB' | 'PRIV',
    name: string, 
    max: number 
  } ) => {

    setLoading({...loading, form: true});

    try {

      let response = await createRoom(data);

      if(response.message) {
        toast[response.status](response.message);
      }

      if(response.status === "success" && response.data) {
        router.push(`/room/${response.data}`);
      }
      
    } catch(e) {
      console.error(e);
    } finally {
      setLoading({...loading, form: false});
    }
  };

  const ZodSchema = z.object({
    privacy: z.string().min(1, "Privacy name is required"),
    name: z.string().min(1, "Room name is required"),
    max: z.string().min(1, "Max users is required")
  });

  useEffect(() => {

    setLoading({ ...loading, page: true });

    const loadPublicRooms = async () => {

      const response = await getPublicRooms();
  
      if(response.message) {
        toast[response.status](response.message);
      }
  
      if(response.data) {
        setPublicRooms(response.data);
      }
  
      setLoading({ ...loading, page: false });
    }

    loadPublicRooms();

  }, []);

  const filteredRooms = publicRooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <LoadingScreen loading={loading.page} />

      { modalForm && (
        <Modal.Root>
          <Modal.Header>
            <h1 className="text-foreground-1 text-3xl font-medium">
              Create
            </h1>
            <button onClick={() => showModalForm(false)} className="text-foreground-1 text-2xl font-medium">
              <X />
            </button>
          </Modal.Header>

          <Modal.Body>
            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema}>
              
              <Form.Input type="text"   name="name"    label="Room name"  placeholder="" style="secondary" />
              <Form.Input type="number" name="max"     label="Max users"  placeholder="" style="secondary" />
              
              <div>
                <label className="text-white font-medium">
                  Room status
                </label>
                <div className="flex w-full justify-start">
                  <Form.Input type="radio" name="privacy" label="Public"  placeholder="" style="default" value={"PUB"}  />
                  <Form.Input type="radio" name="privacy" label="Private" placeholder="" style="default" value={"PRIV"} />
                </div>
              </div>
              
              <div className="flex w-full justify-end">
                <Button 
                  role="success" 
                  type="submit"
                  loading={loading.form}
                >
                  {loading.form && (
                    <LoaderIcon className="animate-spin h-5 w-5 text-primary" />
                  )}
                  Create
                </Button>
              </div>

            </Form.Body>
          </Modal.Body>
        </Modal.Root>
      )}

      <div className="flex flex-col w-full p-8 gap-16">

        <section className="flex gap-2 border border-dashed border-shade-3 rounded-lg">
          <div className="relative rounded-lg  p-4 w-full">

            <div className="flex flex-col gap-4 justify-center items-center relative z-10">
              <div className="text-center">
                <h1 className="text-4xl font-medium">Create your room</h1>
                <p className="text-sm">Be a <span className="px-1 rounded-full bg-yellow-600 font-bold">GM</span> and create a room and invite your friends to a cool RPG party</p>
              </div>

              <Button role="success" onClick={() => showModalForm(!modalForm)}>
                Create
              </Button>
            </div>

          </div>
        </section>

        <section className="flex flex-col gap-4">

          <div className="flex gap-2 w-full justify-between">
            <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
              <Boxes className="size-10 text-primary"/>
              Public rooms
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

          <div className="">
            
            { publicRooms.length > 0 ? (
              <div className="flex flex-col gap-2 w-full">
                { filteredRooms.map((room, index) => (
                  <div id={room.id} key={index} className="w-full bg-shade-4 rounded-lg hover:scale-[1.02] transition-all duration-75 border-2 border-shade-4  hover:border-primary">

                    <div className="flex justify-between items-center w-full p-2">
                      <span className="flex justify-center text-2xl font-medium text-primary">
                        {room.name}
                      </span>
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
              </div>
            ):(
              <div className="flex w-full justify-center items-center mt-16">
                <span className="flex flex-col justify-center items-center text-shade-3">
                  <PackageOpen className="size-16"/>
                  <p className="text-lg font-bold">No public rooms found</p>
                </span>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default Rooms;
