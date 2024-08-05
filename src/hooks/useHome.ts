"use client";

import { selectCharactersInfo } from "@services/userService";
import { checkRoomExists } from "@services/roomService";
import { getUserCookies } from "@utils/cookies";

const useHome = () => {

    const getPublicRooms = async (): Promise<ResponseObject<RoomInfo[]>> => {
        return {
            status: "error",
            message: "Not implemented"
        }
    };

    const getUserRooms = async (): Promise<ResponseObject<UserRoomsData[]>> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return {
                status: "error",
                message: "Invalid cookies"
            }
        }

        try {
            let userCharactersInfo = await selectCharactersInfo(cookies.uuid);
        
            if(userCharactersInfo) {
                
                let userRooms: UserRoomsData[] = [];
    
                userCharactersInfo.users_characters_tb.forEach((value: any) => {

                    userRooms.push({
                        id: value.rooms_tb.id,
                        room: value.rooms_tb.room,
                        name: value.rooms_tb.name,
                        character: value.name,
                        role: value.roles_tb.name,
                        created_at: value.rooms_tb.created_at
                    });
                });
    
                return {
                    status: "success",
                    data: userRooms
                };
            }

            return {
                status: "error",
                message: "User not found"
            }
            
        } catch (error: any) {
            return {
                status: "error",
                message: error.message
            };
        }
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

                return { 
                    status: "error", 
                    message: "Room does not exist"
                };
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