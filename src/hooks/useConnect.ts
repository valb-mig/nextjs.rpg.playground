"use client";

import { useRouter } from 'next/navigation';
import { setUserCookies } from "@/handlers/handleCookie";
import { loginUser } from '@/helpers/connectHelper';
import { v4 as uuidv4 } from 'uuid';

type FormData = {
    name: string,
    token: string
}

const useConnect = () => {

    const router = useRouter();

    const connectUser = async (formData: FormData) => {

        // [TODO] Connect to database

        let userInfo: UserInfo = {
            uuid: uuidv4(),
            character_name: formData.name,
            room_code: formData.room,
            role: undefined,
            position: undefined,
            dice: undefined
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        try {
            await setUserCookies(userInfo);
            router.push(`/room/${formData.room}`);
        } catch (e) {
            console.error('[usePlayer] Error tying to set cookie: ', e);
        }
    }

    return { connectUser };
}

export default useConnect;