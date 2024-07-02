"use client";

import { selectUserRooms } from "@helpers/userHelper";
import { getUserCookies } from "@/handlers/handleCookie";

const useDashboard = () => {

    const getUserRooms = async () => {

        let cookies = await getUserCookies();
    
        try {

            let userRooms = await selectUserRooms(cookies.uuid);
            return userRooms;

        } catch (error: any) {
            return { message: error.message };
        }
    };

    return { getUserRooms };
};

export default useDashboard;