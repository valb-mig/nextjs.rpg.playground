"use client";

import { createUserAndRoom } from "@/helpers/userHelper";

type FormData = {
  name: string;
  token: string;
  room: string;
};

const usePlayer = () => {
  const joinRoom = async (formData: FormData) => {
    try {
      let createdUser = await createUserAndRoom("player", formData);

      if (!createdUser) {
        throw new Error("User creation failed");
      }

      return createdUser;

    } catch (error: any) {
      return { message: error.message };
    }
  };

  return { joinRoom };
};

export default usePlayer;
