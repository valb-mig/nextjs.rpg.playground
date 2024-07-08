"use client";

import { selectCharacterData } from "@helpers/userHelper";
import { getUserCookies } from "@/handlers/handleCookie";

const useRoom = () => {

    const getCharacterInfo = async (): Promise<ResponseObject> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies", 
                data: null
            };
        }

        try {
            let userCharactersInfo = await selectCharacterData(cookies.uuid);
        
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

    const joinRoom = async (room: string) => {
        // TODO: Join room
    };

    return { getCharacterInfo, joinRoom };
};

export default useRoom;