"use client";

import { selectCharacterData, selectRoomData } from "@services/roomService";
import { insertCharacter } from "@services/characterService";

import { getUserCookies } from "@utils/cookies";

const useRoom = (roomId: string) => {

    const getCharacterInfo = async (): Promise<ResponseObject<CharacterInfo>> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
            };
        }

        try {

            const response = await selectCharacterData(cookies.uuid, roomId);

            let character = response.data;

            if(!character || response.status === "error") {
                throw new Error(response.message);
            }
            
            let characterInfo: CharacterInfo;

            if(character) {

                characterInfo = {
                    name: character.name,
                    room: roomId,
                    life: character.info[0].life,
                    notes: character.info[0].notes,
                    age: character.info[0].age,
                    gold: character.info[0].gold,
                    character_id: character.info[0].character_id,
                    inventory: character.inventory,
                    stats: character.stats
                };

                return { 
                    status: "success", 
                    data: characterInfo 
                };
            }

            throw new Error("Character not found");
            
        } catch (error: any) {

            return {
                status: "error",
                message: error.message
            };
        }
    };

    const getRoomData = async (): Promise<ResponseObject<RoomInfo>> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
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
                    data: roomInfo 
                };
            }

            return {
                status: "error",
                message: "Room not found"
            };
            
        } catch (error: any) {

            return {
                status: "error",
                message: error.message
            };
        }
    };

    const joinRoom = async (characterData: CharacterData): Promise<ResponseObject<boolean>> => {

        let cookies = await getUserCookies();

        if(!cookies) {

            return { 
                status: "error", 
                message: "Invalid cookies"
            };
        }

        try {

            const response = await insertCharacter(cookies.uuid, roomId, characterData);
        
            if(response) {

                return { 
                    status: "success", 
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

    return { getCharacterInfo, joinRoom, getRoomData };
};

export default useRoom;