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

    const resHello = (usersObject: RoomUsersObject) => {

        let users: UserInfo[] = [];

        Object.keys(usersObject).map((key) => {
            let user: UserInfo = usersObject[key];
            users.push(user);
        });

        return users;
    }

    const resEnterRoom = (socketId: string, room: string) => {

        let userData = getUserData();

        if(userData != undefined) {

            let updateUser: UserInfo = {
                uuid: userData.uuid,
                character_name: userData.character_name,
                room_code: userData.room_code,
                position: userData.position,
                dice: undefined
            };

            updateUserData(updateUser);
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

            if(user.uuid === moveUser.uuid) {
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

            if(user.uuid == rollUser.uuid) {
                user.dice = rollUser.dice;
            }

            users.push(user);
        });

        return users;
    }

    return { resHello, resEnterRoom, resMapMovement, resRollDice };
}

export default socketHooks;