"use client";

import { insertRoom, selectPublicRooms } from "@services/roomService";
import validateCookies from "@/utils/validateCookies";

const useRooms = () => {

    const createRoom = async (data: { 
        privacy: 'PUB' | 'PRIV',
        name: string, 
        max: number 
    }): Promise<ResponseObject<string>> => {
        
        return validateCookies<string>(async (cookies) => {

            const response = await insertRoom(cookies.uuid, cookies.name, data);
        
            if(response) {

                return { 
                    status: "success", 
                    message: "Wellcome to the party",
                    data: response
                };
            }

            throw new Error("Something went wrong");
        })
    };

    const getPublicRooms = async (): Promise<ResponseObject<RoomData[]>> => {

        return validateCookies<RoomData[]>(async () => {

            const response = await selectPublicRooms();

            if(response) {
                return {
                    status: "success",
                    data: response
                }
            }

            throw new Error();
        });

    }

    return { createRoom, getPublicRooms };
}

export default useRooms;