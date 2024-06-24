"use client";

import { useRouter } from 'next/navigation';
import type { UserInfo } from "@/types";
import { setUserCookies } from "@/handlers/handleCookie";
import { v4 as uuidv4 } from 'uuid';

type FormData = {
    name: string,
    room: string,
    token: string,
    image: File
}

const useJoin = () => {

    const router = useRouter();

    const joinRoom = async (formData: FormData) => {

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
            console.error('[useJoin] Error tying to set cookie: ', e);
        }
    }

    return { joinRoom };
}

export default useJoin;