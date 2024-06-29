"use client";

import supabase from '@lib/supabaseClient';

import type { User } from '@db/users_tb';
import type { Room } from '@db/rooms_tb';
import type { UsersRoom } from '@db/users_room_tb';

import { v4 as uuidv4 } from 'uuid';

type FormData = {
    name: string,
    token: string,
    room: string
};

export const createUserAndRoom = async (role: string, formData: FormData) => {

    let user: User = {
        uuid: uuidv4(),
        name: formData.name,
        token: formData.token
    };

    try {

        let roleID = await selectRoleID(role);

        if (!roleID) {
            throw new Error('Error selecting role');
        }

        let roomID: number;

        // GM - Create room

        if(role === 'gm') {

            let createdRoom = await insertRoom(formData.room);

            if (!createdRoom) {
                throw new Error('Error creating room');
            }

            roomID = createdRoom[0].id;
        }
        else {
            roomID = await seletRoomByName(formData.room);

            if (!roomID) {
                throw new Error('Error selecting room');
            }
        }

        let createdUser = await insertUser(user);

        if (!createdUser) {
            throw new Error('Error creating user');
        }

        let createdUserRoom = await insertUsersRoom(createdUser[0].id, roomID, roleID);

        if (!createdUserRoom) {
            throw new Error('Error creating user room');
        }
    }
    catch (e) {
        console.error(e);
    }
}

async function selectRoleID(role: string) {
    
    const { data, error } = await supabase
        .from('roles_tb')
        .select('id')
        .eq('name', role)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    return data.id;
}

async function seletRoomByName(roomName: string) {

    const { data, error } = await supabase
        .from('rooms_tb')
        .select('id')
        .eq('room', roomName)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    return data.id;
}

async function insertUser(user: User) {

    const { data, error } = await supabase
        .from('users_tb')
        .insert([user])
        .select();

    if (error) {
        console.log(error);
        return;
    }

    return data;
}

async function insertRoom(room: string) {

    let roomObj: Room = {
        room: room
    };

    const { data, error } = await supabase
        .from('rooms_tb')
        .insert([roomObj])
        .select();

    if (error) {
        console.log(error);
        return;
    }

    return data;
}

async function insertUsersRoom(userID: number, roomID: number, roleID: number) {

    let userRoomObj = <UsersRoom>{
        user_id: userID,
        room_id: roomID,
        role_id: roleID
    };

    const { data, error } = await supabase
        .from('users_room_tb')
        .insert([ userRoomObj ])
        .select();

    if (error) {
        console.log(error);
        return;
    }

    return data;
}