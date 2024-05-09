"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';

import useHome from "@/app/hooks/useHome";

const ZodSchema = z.object({
  character_name: z.string(),
  room_code: z.string()
});

type formSchema = z.infer<typeof ZodSchema>;

const Home = () => {

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
		try {
      enterRoom(data);
			reset();
		} catch (error) {
			setError("root", {
				message: "Connection error",
			});
		}
	};

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-900">
      <div className='flex w-full justify-center'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>

          <div>
            <label htmlFor="character_name" className="text-white">Character Name</label>
            <input {...register("character_name")} />
            {errors.character_name && (
              <span className="text-red-500 text-sm">
                {errors.character_name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="room_code" className="text-white">Room Code</label>
            <input {...register("room_code")} />
            {errors.room_code && (
              <span className="text-red-500 text-sm">
                {errors.room_code.message}
              </span>
            )}
          </div>

          <button type="submit" className="bg-blue-300">Click</button>
        </form>
      </div>
    </main>
  );
}

export default Home;