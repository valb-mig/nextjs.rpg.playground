"use client";

import { createUserAndRoom } from "@/helpers/userHelper";

type FormData = {
  name: string;
  token: string;
  room: string;
};

const useGm = () => {
  const createRoom = async (formData: FormData) => {
    await createUserAndRoom("gm", formData);
  };

  return { createRoom };
};

export default useGm;
