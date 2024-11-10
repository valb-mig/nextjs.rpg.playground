"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";

import { 
  DoorOpen, 
  User,
  MapIcon,
  NotepadText,
  Trash,
  PinIcon,
  LoaderIcon
} from "lucide-react";

import { useRoomContext } from "@/context/RoomContext";

import { toast } from "sonner";
import useRoom from "@hooks/useRoom";

import handleSocket from "@/handlers/handleSocket";

import LoadingScreen from "@layout/LoadingScreen";
import ToolBar from "@layout/ToolBar";
import Map from "@/components/layout/Map";
import Button from "@/components/ui/Button";
import Modal from "@/components/layout/Modal";
import Input from "@/components/ui/Input";

const Room = ({ params }: { params: { id: string} }) => {

  const roomContext = useRoomContext();

  const { 
    characterInfo, setCharacterInfo, 
    roomCharacters, 
    roomData, setRoomData
  } = roomContext;
  
  const [ loading, setLoading ] = useState<{
    form: boolean,
    screen: boolean,
  }>({
    form: false,
    screen: false
  });

  const [ showPinOption, setShowPinOption ] = useState(false);

  const [ pinConfig, setPinConfig ] = useState<{
    name?: string,
    color?: string
  }>();

  const { getCharacterInfo, getRoomData } = useRoom(params.id);

  const submitPin = async () => {

    setLoading({...loading, form: true});
    socket.emit("req_pin_map", params.id, characterInfo?.uuid, pinConfig);
    setLoading({...loading, form: false});

    setPinConfig({ name: '', color: '' });
    setShowPinOption(false);
  }

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
      {showPinOption && (
        <Modal.Root>
          <Modal.Header title="Pin configuration" modal={showPinOption} setModal={setShowPinOption} />
          <Modal.Body>

            <Input type="text" label="Name" name="name" onChange={(e) => setPinConfig({
              ...pinConfig,
              name: e.target.value
            })} />

            {/* [TODO] Transform in a select input */}

            <Input type="text" label="Color" name="pin_color" onChange={(e) => setPinConfig({
              ...pinConfig,
              color: e.target.value
            })} />

            <div className="flex w-full justify-end">
              <Button 
                role="success" 
                type="submit"
                onClick={() => submitPin()}
              >
                {loading.form && (
                  <LoaderIcon className="animate-spin h-5 w-5 text-primary" />
                )}
                Create
              </Button>
            </div>
          </Modal.Body>
        </Modal.Root>
      )}

      <LoadingScreen loading={loading.screen} />

      { !loading.screen && characterInfo && roomData && (
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

            <div className="text-foreground-1 items-center">
              <h2 className="flex gap-2 items-center text-lg md:text-3xl sm:text-2xl font-medium">
                <MapIcon className="text-primary size-10" />
                Map
              </h2>
            </div>

            <section className="flex gap-2 flex-col">
              
              <div className="flex">
                <h3 className="bg-shade-4 px-2 rounded-full font-medium">
                  Map toolbar
                </h3>
              </div>

              <div className="border border-shade-4 p-2 rounded-full">
                <Button 
                  style="button" 
                  role="default" 
                  onClick={() => setShowPinOption(!showPinOption)}
                >
                  <PinIcon className="size-4"/> <span className="text-lg">pin option</span>
                </Button>
              </div>
            </section>

            <div role="map" className="flex gap-2 w-full flex-col bg-shade-4 rounded-lg p-2">
              <Button 
                style="button" 
                role="inherit" 
                onClick={() => socket.emit("req_map_clear", characterInfo)}
              >
                <Trash className="size-4"/> <span className="text-lg">clear</span>
              </Button>
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
