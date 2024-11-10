"use client";

import { selectCharactersInfo } from "@services/userService";
import { checkRoomExists } from "@services/roomService";
import { getUserCookies } from "@utils/cookies";
import validateCookies from "@/utils/validateCookies";

const useHome = () => {

    const getPublicRooms = async (): Promise<ResponseObject<RoomInfo[]>> => {
        return {
            status: "error",
            message: "Not implemented"
        }
    };

    const getUserRooms = async (): Promise<ResponseObject<UserRoomsData[]>> => {

        return validateCookies<UserRoomsData[]>(async (cookies) => {

            let userCharactersInfo = await selectCharactersInfo(cookies.uuid);
        
            if(userCharactersInfo) {
                
                let userRooms: UserRoomsData[] = [];
    
                userCharactersInfo.characters.forEach((value: any) => {

                    userRooms.push({
                        id: value.room.id,
                        room: value.room.room,
                        name: value.room.name,
                        character: value.name,
                        role: value.role.name,
                        created_at: value.room.created_at
                    });
                });
    
                return {
                    status: "success",
                    data: userRooms
                };
            }

            throw new Error("Something went wrong");
        })
    };

    const checkRoom = async (room: string): Promise<ResponseObject<boolean>> => {
        
        let cookies = await getUserCookies();
    
        if (!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
            };
        }
    
        try {

            let response = await checkRoomExists(room);
    
            if (!response) {
                throw new Error("Room does not exist");
            }

            return { 
                status: "success", 
                data: response 
            };

        } catch (error: any) {

            return { 
                status: "error", 
                message: error.message,
            };
        }
    };

    return { getPublicRooms, getUserRooms, checkRoom };
};

export default useHome;