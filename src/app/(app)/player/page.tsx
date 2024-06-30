"use client";

import { z } from "zod";
import Link from "next/link";

import { LogIn, Dices } from "lucide-react";

import usePlayer from "@hooks/usePlayer";

import Form from "@ui/Form";
import Button from "@ui/Button";

const ZodSchema = z.object({
  name: z.string().min(1),
  token: z.string().min(1).max(10),
  room: z.string().min(1),
});

const Player = () => {
  const { joinRoom } = usePlayer();

  const onFormSubmit = async (data: any) => {
    joinRoom(data);
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
      <div className="flex gap-2 w-full h-full items-center px-2">
        <div className="flex flex-col justify-center items-center gap-2 w-full lg:w-1/2">
          <div className="flex w-full justify-center items-center p-4">
            <h1 className="flex gap-2 text-foreground-1 text-4xl items-center">
              <Dices width={50} height={50} /> Join
            </h1>
          </div>

          <Form.Body
            onSubmit={onFormSubmit}
            schema={ZodSchema}
            style="w-full md:w-[500px] bg-shade-4"
          >
            <Form.Input label="Username" name="name" type="text" />

            <Form.Input label="Token" name="token" type="password" />

            <Form.Input label="Room" name="room" type="text" />

            <div className="flex w-full justify-end">
              <div className="flex gap-2 items-center">
                <Link
                  href="/connect"
                  className="flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full"
                >
                  <LogIn width={30} height={30} className="text-shade-1" />
                  Connect
                </Link>
                <Button type="submit">
                  <LogIn />
                  Join
                </Button>
              </div>
            </div>
          </Form.Body>
        </div>

        <div className="hidden lg:flex flex-col justify-center items-center gap-2 w-full lg:w-1/2">
          <span className="text-5xl text-foreground-1 font-bold text-center">
            Start a new history
            <p className="text-sm italic text-foreground-4">
              {"Create a new character and start a new history"}
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Player;
