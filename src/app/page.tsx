"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';

import useHome from "@/app/hooks/useHome";

import { getUserData } from '@/utils/helper';

import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';

const ZodSchema = z.object({
  character_name: z.string().max(10),
  room_code: z.string()
});

type formSchema = z.infer<typeof ZodSchema>;

const Home = () => {

  let userData = getUserData();

  const { enterRoom } = useHome();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(ZodSchema),
  });

  const handleFormSubmit: SubmitHandler<formSchema> = async (data) => {
    enterRoom(data);
    reset();
	};

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-950">
      
      <div className="flex w-full justify-end p-2">
        { userData !== undefined && userData !== null && (
          <div className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-lg">
            <span className="rounded-lg bg-neutral-800 text-white">
              Bem-vindo de volta, {userData.character_name}
            </span>
            <button onClick={() => {enterRoom(userData)}} className="bg-blue-300 p-2 rounded">
              Voltar para sala <b>{userData.room_code}</b>
            </button>
          </div>
        )}
      </div>

      <div className='flex w-full justify-center px-2'>

        <Form onSubmit={handleSubmit(handleFormSubmit)} style="mt-[30vh] w-full md:w-[500px]">

          <Input 
            label="Character Name"
            errors={errors} 
            name="character_name" 
            register={register}
          />
         
          <Input 
            label="Room Code" 
            errors={errors} 
            name="room_code" 
            register={register}
          />

          <div className="flex w-full justify-end">
            <button type="submit" className="bg-blue-300 p-2 rounded">
              Enter
            </button>
          </div>
        </Form>
        
      </div>
    </main>
  );
}

export default Home;