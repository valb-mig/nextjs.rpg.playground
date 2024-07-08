"use client";

import { selectCharacterData, selectRoomData } from "@helpers/roomHelper";
import { getUserCookies } from "@/handlers/handleCookie";

const useRoom = (roomId: string) => {

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

            const characterData = await selectCharacterData(cookies.uuid, roomId);
        
            let characterInfo: CharacterInfo;

            if(characterData) {

                characterInfo = {
                    name: characterData.name,
                    life: characterData.characters_info_tb[0].life,
                    notes: characterData.characters_info_tb[0].notes,
                    age: characterData.characters_info_tb[0].age,
                    gold: characterData.characters_info_tb[0].gold,
                    character_id: characterData.characters_info_tb[0].character_id,
                    inventory: characterData.characters_inventory_tb,
                    stats: characterData.characters_stats_tb
                };

                return { 
                    status: "success", 
                    message: "Character info loaded", 
                    data: characterInfo 
                };
            }

            throw new Error("Character not found");
            
        } catch (error: any) {

            return {
                status: "error",
                message: error.message,
                data: null
            };
        }
    };

    const getRoomData = async (): Promise<ResponseObject> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies", 
                data: null
            };
        }

        try {

            const roomData = await selectRoomData(cookies.uuid, roomId);
        
            let roomInfo: RoomInfo;

            if(roomData) {

                roomInfo = {
                    id: roomData.id,
                    room: roomData.room,
                    name: roomData.name,
                    created_at: roomData.created_at
                };

                return { 
                    status: "success", 
                    message: "Room info loaded", 
                    data: roomInfo 
                };
            }

            throw new Error("Room not found");
            
        } catch (error: any) {

            return {
                status: "error",
                message: error.message,
                data: null
            };
        }
    };

    const joinRoom = async () => {
        // TODO: Join room
    };

    return { getCharacterInfo, joinRoom, getRoomData };
};

export default useRoom;