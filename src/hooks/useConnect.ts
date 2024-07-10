"use client";

import { useRouter } from "next/navigation";
import { setUserCookies } from "@utils/cookies";
import { getUserData } from "@services/connectService";

type FormData = {
  name: string;
  token: string;
};

const useConnect = () => {
  const router = useRouter();

  const connectUser = async (formData: FormData): Promise<ResponseObject> => {
    
    let user = await getUserData(formData);

    if (!user) {
      
      return { 
        status: "error", 
        message: "User not found", 
        data: null 
      };
    }

    const userInfo: CookieData = {
      uuid: user.uuid,
      name: user.name
    };

    try {
      await setUserCookies(userInfo);
      router.push(`/dashboard`);

      return {
        status: "success",
        message: "User connected",
        data: null
      }
    } catch (e) {
      console.error("[Error] Error tying to set cookie: ", e);

      return {
        status: "error",
        message: "Error tying to set cookie",
        data: null
      }
    }
  };

  return { connectUser };
};

export default useConnect;
