"use client";

import { useState } from "react";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Form from "@/components/ui/Form";
import { z } from "zod";
import { Cloud, LoaderIcon, Plus, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/layout/Modal";

const Rooms = ({ params }: { params: { id: string} }) => {

  const [ modalForm, showModalForm ] = useState(false);
  const [ loading, setLoading ] = useState({
    page: false,
    form: false
  });

  const onFormSubmit = ( data: any ) => {
    console.log(data);
  };

  const ZodSchema = z.object({
    room: z.string().min(1, "Room code is required")
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
              ...
            </Form.Body>
          </Modal.Body>
        </Modal.Root>
      )}

      <div className="flex flex-col w-full p-8 gap-16">

        <div className="relative">
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

      </div>
    </>
  );
};

export default Rooms;
