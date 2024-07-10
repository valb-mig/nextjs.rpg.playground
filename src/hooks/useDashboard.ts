"use client";

import { selectCharactersInfo } from "@services/userService";
import { checkRoomExists } from "@services/roomService";
import { getUserCookies } from "@utils/cookies";

const useDashboard = () => {

    const getUserRooms = async () => {

        let cookies = await getUserCookies();

        if(!cookies) {
            return { message: "Invalid cookies" };
        }

        try {
            let userCharactersInfo = await selectCharactersInfo(cookies.uuid);
        
            if(userCharactersInfo) {
                
                let userRooms: RoomInfo[] = [];
    
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
    
                return userRooms;
            }
            
        } catch (error: any) {
            return { message: error.message };
        }

        return { message: "User not found" };
    };

    const createRoom = async (room: string) => {
        // TODO: Create room
    };

    const checkRoom = async (room: string): Promise<ResponseObject> => {
        
        let cookies = await getUserCookies();
    
        if (!cookies) {
            return { 
                status: "error", 
                message: "Invalid cookies", 
                data: null 
            };
        }
    
        try {

            let response = await checkRoomExists(room);
    
            if (!response) {
                return { 
                    status: "error", 
                    message: "Room does not exist", 
                    data: null 
                };
            }
    
            console.log(response);
            

            return { 
                status: "success", 
                message: "Room exists", 
                data: response 
            };
        } catch (error: any) {
            return { 
                status: "error", 
                message: error.message, 
                data: null 
            };
        }
    };

    return { getUserRooms, createRoom, checkRoom };
};

export default useDashboard;