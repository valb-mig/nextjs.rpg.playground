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
    
                userCharactersInfo.users_characters_tb.forEach((value) => {

                    userRooms.push({
                        id: value.rooms_tb[0]?.id,
                        room: value.rooms_tb[0]?.room,
                        name: value.rooms_tb[0]?.name,
                        character: value.name,
                        role: value.roles_tb[0]?.name,
                        created_at: value.rooms_tb[0]?.created_at
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