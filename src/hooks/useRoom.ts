"use client";

import { selectCharacterData, selectRoomData, updateRoomSettings } from "@services/roomService";
import validateCookies from "@/utils/validateCookies";
import { insertCharacter } from "@services/characterService";

const useRoom = (roomId: string) => {

    const getCharacterInfo = async (): Promise<ResponseObject<CharacterSocketInfo>> => {

        return validateCookies<CharacterSocketInfo>(async (cookies) => {

            const response = await selectCharacterData(cookies.uuid, roomId);

            let character = response.data;

            if(!character || response.status === "error") {
                throw new Error(response.message);
            }
            
            if(character) {

                return { 
                    status: "success", 
                    data: <CharacterSocketInfo>{
                        uuid: cookies.uuid,
                        name: character.name,
                        role: character.role.name,
                        room: roomId,
                        life: character.info[0]?.life,
                        xp: character.info[0]?.xp,
                        notes: character.info[0]?.notes,
                        age: character.info[0]?.age,
                        gold: character.info[0]?.gold,
                        character_id: character.info[0]?.character_id,
                        inventory: character?.inventory,
                        stats: character?.stats
                    } 
                };
            }

            throw new Error();
        });

    };

    const getRoomData = async (): Promise<ResponseObject<RoomInfo>> => {

        return validateCookies<RoomInfo>(async (cookies) => {

            const roomData = await selectRoomData(cookies.uuid, roomId);
            
            if(roomData) {

                return { 
                    status: "success",
                    data: <RoomInfo>{
                        id: roomData.id,
                        room: roomData.room,
                        name: roomData.name,
                        created_at: roomData.created_at,
                        stats: roomData?.stats
                    } 
                };
            }

            throw new Error();
        })
    };

    const joinRoom = async (characterData: CharacterData): Promise<ResponseObject<boolean>> => {

        return validateCookies<boolean>(async (cookies) => {

            const response = await insertCharacter(cookies.uuid, roomId, characterData);
        
            if(response) {

                return { 
                    status: "success", 
                    message: `Wellcome ${characterData.name} to the party`,
                    data: true
                };
            }

            throw new Error();
        })
    };

    const updateRoomConfig = async (data: { status: string }): Promise<ResponseObject<boolean>> => {
        return validateCookies<boolean>(async (cookies) => {

            const roomData = await selectRoomData(cookies.uuid, roomId);

            if(!roomData) {
                return {
                    status: "error",
                    message: "Room don't exists"
                }
            }

            let updatedStats: string[] = [];

            Object.values(data.status).map((stat) => {
                updatedStats.push(stat);
            });

            const roomConfig = await updateRoomSettings(roomData.id, updatedStats);

            if(roomConfig) {
                
                return {
                    status: "success",
                    data: true
                }
            }

            throw new Error();
        })
    }

    return { getCharacterInfo, joinRoom, getRoomData, updateRoomConfig };
};

export default useRoom;