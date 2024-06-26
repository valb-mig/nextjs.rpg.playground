"use client";

import { useRouter } from "next/navigation";
import { setUserCookies } from "@/handlers/handleCookie";
import { getUserData } from "@/helpers/connectHelper";

type FormData = {
  name: string;
  token: string;
};

const useConnect = () => {
  const router = useRouter();

  const connectUser = async (formData: FormData) => {
    let user = await getUserData(formData);

    if (!user) {
      return;
    }

    console.log(user);

    const userInfo = {
      uuid: user.uuid,
      name: user.name
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    try {
      await setUserCookies(userInfo);
      router.push(`/dashboard`);
    } catch (e) {
      console.error("[usePlayer] Error tying to set cookie: ", e);
    }

    return user;
  };

  return { connectUser };
};

export default useConnect;
