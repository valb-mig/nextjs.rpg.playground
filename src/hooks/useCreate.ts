"use client";

import { insertUser } from "@/helpers/userHelper";

type FormData = {
  name: string;
  token: string;
};

const useCreate = () => {

  const createUser = async (formData: FormData) => {
    try {
      let createdUser = await insertUser(formData);

      if (!createdUser) {
        throw new Error("User creation failed");
      }

      return createdUser;

    } catch (error: any) {
      return { message: error.message };
    }
  };

  return { createUser };
};

export default useCreate;
