import { useRouter } from 'next/navigation';
import type { UserInfo } from "@/types/interfaces";
import { setUserCookies } from "@/utils/handlers";

const useHome = () => {

    const router = useRouter();

    const enterRoom = async (formData: UserInfo) => {

        let userInfo: UserInfo = {
            socket_id: undefined,
            character_name: formData.character_name,
            room_code: formData.room_code,
            position: undefined
        }

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