"use client";

import { socket } from "@/socket";
import useSocket from '@/hooks/useSocket';

import type { 
    UserInfo,
    RoomUsersObject,
    RoomData
} from '@/types';

interface HandleSocketProps {
    setRoomUsers: (data: UserInfo[]) => void,
    setRoomData: (data: (prevRoomData: RoomData) => RoomData) => void,
    roomData: RoomData,
    params: {id: string}
}

const handleSocket = ({ setRoomUsers, setRoomData, roomData, params }: HandleSocketProps) => {

    const { 
        resHello, 
        resEnterRoom, 
        resMapMovement,
        resRollDice
    } = useSocket();

    socket.on('res_hello', (usersObject: RoomUsersObject, roomDataObject: RoomData) => {
        setRoomUsers(resHello(usersObject));

        let location = roomDataObject && roomDataObject.location ? roomDataObject.location : roomData.location;
        let showcase = roomDataObject && roomDataObject.showcase ? roomDataObject.showcase : roomData.showcase;

        setRoomData(prevRoomData => ({
            ...prevRoomData,
            location: location,
            showcase: showcase
        }));
    });

    socket.on('res_enter_room', (userData: UserInfo) => {
        resEnterRoom(userData)
    });

    socket.on('res_map_movement', (moveUser: UserInfo, usersObject: RoomUsersObject) => {
        setRoomUsers(resMapMovement(moveUser, usersObject))
    });

    socket.on('res_roll_dice', (rollUser: UserInfo, usersObject: RoomUsersObject) => {
        setRoomUsers(resRollDice(rollUser, usersObject));
    });

    socket.on('res_gm_room_data', (data: { key: any, value: any }) => {

        setRoomData(prevRoomData => ({
            ...prevRoomData,
            [data.key]: data.value
        }));
    });

    return () => {
        socket.off('res_hello');
        socket.off('res_enter_room');
        socket.off('res_map_movement');
        socket.off('res_roll_dice');
        socket.off('res_gm_room_data');
    };
}

export default handleSocket;