"use client";

import { insertRoom } from "@services/roomService";
import { getUserCookies } from "@/utils/cookies";

const useRooms = () => {

    const createRoom = async (data: { name: string, max: string }): Promise<ResponseObject<boolean>> => {
        
        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
            };
        }
        
        try {

            const response = await insertRoom(cookies.uuid, cookies.name, data);
        
            if(response) {

                return { 
                    status: "success", 
                    message: "Wellcome to the party",
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
            message: "Something went wrong"
        };
    };

    return { createRoom };
}

export default useRooms;