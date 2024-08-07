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
  EyeIcon
} from "lucide-react";
import { toast } from "sonner";

import useCreate from "@hooks/useCreate";

import Form from "@ui/Form";
import Button from "@ui/Button";
import LoadingScreen from "@/components/layout/LoadingScreen";

const ZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  token: z.string().min(1, "Token is required")
});

const JoinRoom = ({ params }: { params: { id: string} }) => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const { createUser } = useCreate();

  const onFormSubmit = async (data: any) => {

    setLoading(true);

    let response = await createUser(data);

    if (response.status === "error") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      router.push(`/connect`);
    }

    setLoading(false);
  };

  return (
    <>
      <LoadingScreen loading={false} />

      <div className="flex flex-col w-full p-8 gap-16">
      </div>
    </>
    
  );
};

export default JoinRoom;
