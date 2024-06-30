"use client";

import { useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { Plus, RadioTower, X } from "lucide-react";

import useConnect from "@hooks/useConnect";

import Form from "@ui/Form";
import Button from "@ui/Button";
import Alert from "@ui/Alert";

const ZodSchema = z.object({
  name: z.string().min(1),
  token: z.string().min(1),
});

const Connect = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { connectUser } = useConnect();

  const onFormSubmit = async (data: any) => {
    await connectUser(data)
      .then(() => {
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">
      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
          <dialog className="fixed inset-0 z-10 flex items-center justify-center bg-transparent p-4">
            <div className="w-full  p-6 bg-shade-5 rounded border border-shade-4 shadow-xl">
              <div className="flex w-full justify-between">
                <h2 className="text-xl font-bold text-foreground-1 w-full">
                  Choose your role
                </h2>
                <X
                  className="w-8 h-8 text-foreground-4 hover:text-foreground-1 hover:scale-105 transition cursor-pointer"
                  onClick={() => setModalOpen(false)}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-start p-2">
                <a
                  className="text-start w-full bg-transparent p-2 rounded-lg hover:bg-shade-4 hover:text-foreground-1 hover:scale-105 transition"
                  href="/gm"
                >
                  <span className="text-2xl font-bold text-foreground-4">
                    Game Master
                  </span>
                  <Alert
                    type="info"
                    title="Info"
                    message="You are a game master, you can create and manage your games, and invite players to join your games."
                  />
                </a>

                <a
                  className="text-start w-full bg-transparent p-2 rounded-lg hover:bg-shade-4 hover:text-foreground-1 hover:scale-105 transition"
                  href="/player"
                >
                  <span className="text-2xl font-bold text-foreground-4">
                    Player
                  </span>
                  <Alert
                    type="info"
                    title="Info"
                    message="You are a player, you can join games and play them."
                  />
                </a>
              </div>
            </div>
          </dialog>
        </div>
      )}

      <div className="flex gap-2 w-full h-full items-center px-2">
        <div className="flex flex-col justify-center items-center gap-2 w-full lg:w-1/2">
          <div className="flex w-full justify-center items-center p-4">
            <h1 className="flex gap-2 text-foreground-1 text-4xl items-center">
              <RadioTower width={50} height={50} /> Connect
            </h1>
          </div>

          <div className="flex flex-col gap-2 w-full justify-center items-center px-2">
            <Form.Body
              onSubmit={onFormSubmit}
              schema={ZodSchema}
              style="w-full md:w-[500px] bg-shade-4"
            >
              <Form.Input label="name" name="name" type="text" />

              <Form.Input label="token" name="token" type="password" />

              <div className="flex w-full justify-end">
                <div className="flex gap-2 items-center">
                  <span
                    className="flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full gap-2 cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  >
                    dont have an account?
                  </span>
                  <Button type="submit" loading={loading}>
                    <Plus />
                    Connect
                  </Button>
                </div>
              </div>
            </Form.Body>
          </div>
        </div>

        <div className="hidden lg:flex flex-col w-full justify-center items-center gap-2 lg:w-1/2">
          <span className="text-5xl text-foreground-1 font-bold text-center">
            Welcome back
            <p className="text-sm italic text-foreground-4">
              {"Continue your story"}
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Connect;
