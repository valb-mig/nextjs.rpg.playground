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

  const connectUser = async (formData: FormData): Promise<ResponseObject<null>> => {
    
    let response = await getUserData(formData);

    if (response.status === "error" || !response.data) {
      return { 
        status: "error", 
        message: response.message
      };
    }

    const user = response.data;

    await setUserCookies({
      uuid: user.uuid,
      name: user.name
    });

    router.push(`/dashboard`);

    return {
      status: "success",
      message: "Logged"
    }
  };

  return { connectUser };
};

export default useConnect;
