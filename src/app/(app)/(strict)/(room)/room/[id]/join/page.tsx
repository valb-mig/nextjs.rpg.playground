"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useRoomContext } from "@/context/RoomContext";

import { 
  User,
  SwordsIcon, 
  Pencil,
  LogIn,
  ArrowLeft
} from "lucide-react";

import { toast } from "sonner";

import Form from "@ui/Form";
import Button from "@ui/Button";
import LoadingScreen from "@/components/layout/LoadingScreen";

import useRoom from "@/hooks/useRoom";

const ZodSchema = z.object({
  name: z.string().min(1, "Character name is required"),
  notes: z.string().min(1, "Tell us about your character"),
  race: z.string().min(1, "Race is required"),
  role: z.string().min(1, "Role is required"),
  age: z.string().min(1, "Age is required")
});

const JoinRoom = ({ params }: { params: { id: string} }) => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(false);
  const { joinRoom, getRoomData } = useRoom(params.id);
  const { roomData, setRoomData } = useRoomContext();

  const onFormSubmit = async (data: CharacterData) => {

    setLoading(true);

    let response = await joinRoom(data)

    if(response.message) {
      toast[response.status](response.message);
    }

    if(response.status === "success") {
      router.push(`/room/${params.id}`);
    }

    setLoading(false);
  };

  useEffect(() => {

    setLoading(true);

    const loadRoomData = async () => {

      const response = await getRoomData();

      if(response.message) {
        toast[response.status](response.message);
      }

      if(response.data){
        setRoomData(response.data);
      }

      setLoading(false);
    }

    loadRoomData();
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      { roomData && (
        <div className="flex justify-center w-full p-8 gap-48">
          <div className="w-[950px] h-full border-2 border-shade-4 rounded-lg p-8 gap-8">
            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema}>
              
              <section className="flex flex-col gap-8">
                
                <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
                  <User className="text-primary size-10" />
                  Character
                </h2>

                <div className="flex gap-8">
                  <div className="flex w-fit bg-shade-4 rounded-full">
                    <img src="/img/rpg-logo.png" className="size-32 min-w-32 rounded-full hover:opacity-20 transition-all duration-300 cursor-pointer" />
                  </div>

                  <div className="flex flex-col gap-8 w-full">
                    <Form.Input name="name" label="Character Name" placeholder="Enter your character name"/>
                    <div className="flex gap-8">
                      <Form.Input name="role" label="Role" placeholder="Your character role"/>
                      <Form.Input name="race" label="Race" placeholder="Your character race"/>
                      <Form.Input name="age"  label="Age"  placeholder="Your character age"/>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-shade-4 w-full"/>

              <section id="status">
                <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
                  <SwordsIcon className="text-primary size-10" />
                  Status
                </h2>

                <div className="flex justify-center w-full items-center">
              
                  <div className="flex gap-8">
                    {roomData.stats?.map((item, index) => (
                      <Form.Status 
                        key={item.stat}
                        name={'status:'+item.stat} 
                        type="text" 
                        placeholder={item.stat}
                      />
                    ))}
                  </div>
                </div>
              </section>
            
              <hr className="border-shade-4 w-full"/>

              <section id="annotations" className="flex flex-col w-full gap-8">

                <h2 className="flex gap-2 text-foreground-1 text-lg md:text-3xl sm:text-2xl items-center font-medium">
                  <Pencil className="text-primary size-10" />
                  Notes
                </h2>

                <Form.Textarea 
                  name="notes" 
                  label="Notes" 
                  placeholder="Tell us about your character"
                />
              </section>

              <div className="flex w-full justify-end items-center gap-2">
                <Button role="inherit" style="button" className="h-12" onClick={() => router.back()}>
                  <ArrowLeft/>
                  Back
                </Button>
                <Button type="submit" role="success" style="button" className="h-12">
                  <LogIn/>
                  Save
                </Button>
              </div>

            </Form.Body>
          </div>
        </div>
      )}

    </>
  );
};

export default JoinRoom;
