"use client";

import { useState } from "react";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Form from "@/components/ui/Form";
import { z } from "zod";

import { 
  Cloud, 
  LoaderIcon, 
  X
} from "lucide-react";

import Button from "@/components/ui/Button";
import Modal from "@/components/layout/Modal";
import useRooms from "@/hooks/useRooms";
import { toast } from "sonner";

const Rooms = ({ params }: { params: { id: string} }) => {

  const { createRoom } = useRooms();

  const [ modalForm, showModalForm ] = useState(false);
  const [ loading, setLoading ] = useState({
    page: false,
    form: false
  });

  const onFormSubmit = async ( data: any ) => {

    setLoading({...loading, form: true});

    try {
      let response = await createRoom(data);

      toast[response.status](response.message);

      if(response.status === "success") {
        showModalForm(false);
      }
      
    } catch(e) {
      console.error(e);
    } finally {
      setLoading({...loading, form: false});
    }
  };

  const ZodSchema = z.object({
    name: z.string().min(1, "Room name is required")
    // max: z.string().min(1, "Max users is required")
  });

  return (
    <>
      <LoadingScreen loading={false} />

      {modalForm && (
        <Modal.Root>
          <Modal.Header>
            <h1 className="text-foreground-1 text-3xl font-medium">
              Create a room
            </h1>
            <button onClick={() => showModalForm(false)} className="text-foreground-1 text-2xl font-medium">
              <X />
            </button>
          </Modal.Header>

          <Modal.Body>
            <Form.Body onSubmit={onFormSubmit} schema={ZodSchema}>
              
              <Form.Input type="text" name="name" label="Room name" placeholder="" style="secondary" />
              <Form.Input type="number" name="max" label="Max users" placeholder="" style="secondary" />
              
              <div className="flex w-full justify-end">
                <Button role="success" type="submit">
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

        <section className="flex gap-2">


          <div className="relative rounded-lg  p-4 w-1/2">
            <div className="flex flex-col gap-4 justify-center items-center relative z-10">

              <div className="text-center">
                <h1 className="text-4xl font-medium">Create your room</h1>
                <p className="text-sm">Create a room and invite your friends to a cool RPG party</p>
              </div>

              <Button role="success" onClick={() => showModalForm(!modalForm)}>
                Create
              </Button>
            </div>

            <Cloud className="text-primary size-32 absolute -top-10 right-0 z-0 opacity-20" />
          </div>

          <div>
            Be a GM
          </div>
        </section>

      </div>
    </>
  );
};

export default Rooms;
