import type { 
    UserInfo,
    RoomUsersObject
} from '@/types/interfaces';

import { 
    getUserData,
    updateUserData
} from '@/utils/helper';

import { socket } from "@/socket";

const socketHooks = () => {

    const userData = getUserData();

    const resHello = (usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {

            let user: UserInfo = usersObject[key];
            users.push(user);
        });

        return users;
    }

    const resEnterRoom = (socketId: string, room: string) => {

        if(userData != undefined) {

            if(userData.socket_id == undefined) {

                let updateUser: UserInfo = {
                    socket_id: socketId,
                    character_name: userData.character_name,
                    room_code: userData.room_code,
                    position: userData.position,
                    dice: undefined
                };
    
                updateUserData(updateUser);
            }
        }

        socket.emit('req_hello', {
            'room': room, 
            'user_data': JSON.stringify(userData)
        });
    }

    const resMapMovement = (moveUser: UserInfo, usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {

            let user: UserInfo = usersObject[key];

            if(key === moveUser.socket_id) {
                user = moveUser;
            }
            
            users.push(user);
        });

        return users;
    }

    const resRollDice = (usersObject: RoomUsersObject, rollUser: UserInfo) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {

            let user: UserInfo = usersObject[key];

            if(user.socket_id == rollUser.socket_id) {
                user.dice = rollUser.dice;
            }

            users.push(user);
        });

        return users;
    }

    return { resHello, resEnterRoom, resMapMovement, resRollDice };
}

export default socketHooks;