"use client";

import { useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { Plus, RadioTower, X } from "lucide-react";
import { toast } from "sonner";

import useConnect from "@hooks/useConnect";

import Form from "@ui/Form";
import Button from "@ui/Button";

const ZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  token: z.string().min(1, "Token is required")
});

const Connect = () => {
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);
  const { connectUser } = useConnect();

  const onFormSubmit = async (data: any) => {

    setLoading(true);

    try {
      let response = await connectUser(data)
      
      if(!response) {
        toast.error("user not found");
        return;
      }

      toast.success("User connected");
      router.push(`/dashboard`);

    } catch(e) {
      console.error(e);
      toast.error("Error tying to login user");
    } finally {
      setLoading(false);
    };
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">

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
              <Form.Input label="Username" name="name" type="text" />

              <Form.Input label="Token" name="token" type="password" />

              <div className="flex w-full justify-end">
                <div className="flex gap-2 items-center">
                  <span
                    className="flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full gap-2 cursor-pointer"
                    onClick={() => router.push("/create")}
                  >
                    Dont have an account?
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
