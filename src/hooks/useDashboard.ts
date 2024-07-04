"use client";

import { selectCharactersInfo } from "@helpers/userHelper";
import { getUserCookies } from "@/handlers/handleCookie";

const useDashboard = () => {

    const getUserRooms = async () => {

        let cookies = await getUserCookies();

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

    return { getUserRooms };
};

export default useDashboard;