import { useRouter } from 'next/navigation';

import type { 
    UserInfo
} from "@/types/interfaces";

import { setUserCookies } from "@/utils/handlers";
import {v4 as uuidv4} from 'uuid';

type FormData = {
    character_name: string,
    room_code: string,
}

const useHome = () => {

    const router = useRouter();

    const enterRoom = async (formData: FormData) => {

        let userInfo: UserInfo = {
            uuid: uuidv4(),
            character_name: formData.character_name,
            room_code: formData.room_code,
            role: undefined,
            position: undefined,
            dice: undefined
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        try {
            await setUserCookies(userInfo);
            router.push(`/room/${formData.room_code}`);
        } catch (e) {
            console.error('[useHome] Error tying to set cookie: ', e);
        }
    }

    return { enterRoom };
}

export default useHome;