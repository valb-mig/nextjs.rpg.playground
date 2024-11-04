"use client";

import { useState } from "react";

import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { 
  LogIn, 
  Dices,
  User,
  Mail,
  EyeOffIcon,
  EyeIcon,
  AtSign
} from "lucide-react";
import { toast } from "sonner";

import useCreate from "@hooks/useCreate";

import Form from "@ui/Form";
import Button from "@ui/Button";

const ZodSchema = z.object({
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  token: z.string().min(1, "Token is required")
});

const Create = () => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const { createUser } = useCreate();

  const onFormSubmit = async (data: any) => {

    setLoading(true);

    let response = await createUser(data);

    if(response.message) {
      toast[response.status](response.message);
    }

    if(response.status === "success") {
      router.push(`/connect`);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-background-default">

      <div className="flex gap-2 w-full h-full items-center px-2">
        <div className="flex flex-col justify-center items-center gap-2 w-full lg:w-1/2">
          <div className="flex w-full justify-center items-center p-4">
            <h1 className="flex gap-2 text-foreground-1 text-4xl items-center">
              <Dices width={50} height={50} /> Create
            </h1>
          </div>

          <Form.Body
            onSubmit={onFormSubmit}
            schema={ZodSchema}
            style="w-full md:w-[500px] bg-shade-4 p-4 rounded-lg"
          >
            <Form.Input label="Username" name="username" type="text" autofocus>
              <User />
            </Form.Input>

            <Form.Input label="Name" name="name" type="text" autofocus>
              <AtSign />
            </Form.Input>

            <Form.Input label="Email" name="email" type="email">
              <Mail />
            </Form.Input>

            <Form.Input label="Token" name="token" type={showPassword ? "text" : "password"}>
              <span onClick={() => setShowPassword(!showPassword)} className="text-sm cursor-pointer hover:text-primary transition">
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </Form.Input>

            <div className="flex w-full justify-end">
              <div className="flex gap-2 items-center">
                <Link
                  href="/connect"
                  className="flex items-center justify-center text-shade-1 w-full bg-shade-4 hover:bg-shade-3 p-1 px-2 transition rounded-full"
                >
                  Already have an account?
                </Link>
                <Button type="submit" role="success" loading={loading}>
                  <LogIn />
                  Create
                </Button>
              </div>
            </div>
          </Form.Body>
        </div>

        <div className="hidden lg:flex flex-col justify-center items-center gap-2 w-full lg:w-1/2">
          <span className="text-5xl text-foreground-1 font-bold text-center">
            Start a new history
            <p className="text-sm italic text-foreground-4">
              {"Start your journey"}
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Create;
