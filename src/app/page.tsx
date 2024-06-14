"use client";

import { z } from 'zod';
import { getUserData } from '@/handlers/handleUser';

import useHome from "@/hooks/useHome";

import Form from '@ui/Form';

const ZodSchema = z.object({
  character_name: z.string().min(1).max(10),
  room_code: z.string().min(1)
});

const Home = () => {

  const userData = getUserData();

  const { enterRoom } = useHome();

  const onFormSubmit = async (data: any) => {
    enterRoom(data);
	};

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-950">
      
      <div className="flex w-full justify-end p-2">
        { userData && (
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

        <Form.Body onSubmit={onFormSubmit} schema={ZodSchema} style="mt-[30vh] w-full md:w-[500px]">

          <Form.Input
            label="Character Name"
            name="character_name" 
          />
         
          <Form.Input
            label="Room Code" 
            name="room_code"
          />

          <div className="flex w-full justify-end">
            <button type="submit" className="bg-blue-300 p-2 rounded">
              Enter
            </button>
          </div>
        </Form.Body>
        
      </div>
    </main>
  );
}

export default Home;