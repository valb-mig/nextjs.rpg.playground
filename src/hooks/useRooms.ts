"use client";

import { insertRoom } from "@services/roomService";
import { getUserCookies } from "@/utils/cookies";

const useRooms = () => {

    const createRoom = async (data: { name: string }): Promise<ResponseObject<boolean>> => {
        
        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
            };
        }
        
        try {

            const response = await insertRoom(cookies.uuid, data);
        
            if(response) {

                return { 
                    status: "success", 
                    message: `Wellcome to the party`,
                    data: true
                };
            }

        } catch (error: any) {

            return {
                status: "error",
                message: error.message
            };
        }

        return {
            status: "error",
            message: "Character not found"
        };
    };

    return { createRoom };
}

export default useRooms;