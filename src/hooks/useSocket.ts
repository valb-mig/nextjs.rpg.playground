"use client";

import { 
    getUserData,
    updateUserData
} from '@/handlers/handleUser';

import { socket } from "@/socket";

const useSocket = () => {

    const resHello = (usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {
            let user: UserInfo = usersObject[key];
            users.push(user);
        });

        return users;
    }

    const resEnterRoom = (userData: UserInfo) => {

        let clientUserData = getUserData();

        if(userData != undefined ) {

            if(clientUserData?.uuid == userData.uuid) {

                let updateUser: UserInfo = {
                    uuid: userData?.uuid,
                    character_name: userData?.character_name,
                    room_code: userData.room_code,
                    dice: userData?.dice,
                    role: userData?.role,
                    position: userData?.position
                };
    
                updateUserData(updateUser);
            }
            
            socket.emit('req_hello', userData);
            
        } else {
            console.log("Erro ao tentar entrar na sala");
        }
    }

    const resMapMovement = (moveUser: UserInfo, usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {

            let user: UserInfo = usersObject[key];

            if(user.uuid === moveUser.uuid) {
                user = moveUser;
            }
            
            users.push(user);
        });

        return users;
    }

    const resRollDice = (rollUser: UserInfo, usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {

            let user: UserInfo = usersObject[key];

            if(user.uuid == rollUser.uuid) {
                user.dice = rollUser.dice;
            }

            users.push(user);
        });

        return users;
    }

    return { resHello, resEnterRoom, resMapMovement, resRollDice };
}

export default useSocket;