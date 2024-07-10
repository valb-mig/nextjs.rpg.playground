"use client";

import { insertUser } from "@services/userService";

type FormData = {
  name: string;
  token: string;
  email: string;
};

const useCreate = () => {

  const createUser = async (formData: FormData): Promise<ResponseObject> => {

    try {

      let createdUser = await insertUser(formData);

      if (!createdUser) {
        throw new Error("User creation failed");
      }

      return {
        status: "success",
        message: "User created",
        data: createdUser
      };

    } catch (error: any) {
      return {
        status: "error",
        message: error.message,
        data: null
      };
    }
    
  };

  return { createUser };
};

export default useCreate;
