"use client";

import type { User } from "@db/users_tb";
import { insertUser } from "@services/userService";

type FormData = {
  username: string;
  name: string;
  token: string;
  email: string;
};

const useCreate = () => {

  const createUser = async (formData: FormData): Promise<ResponseObject<User>> => {

    try {

      // TODO: Specify error

      let createdUser = await insertUser(formData);

      if (!createdUser) {

        return {
          status: "error",
          message: "OOPS! Something went wrong"
        };
      }

      return {
        status: "success"
      };

    } catch (error: any) {

      return {
        status: "error",
        message: error.message
      };
    }
    
  };

  return { createUser };
};

export default useCreate;
