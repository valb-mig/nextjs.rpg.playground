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

export const createUserAndRoom = async (formData: FormData) => {

    let user: User = {
        uuid: uuidv4(),
        name: formData.name,
        token: formData.token
    };

    let createdUser = await insertUser(user);

    if (!createdUser) {
        return;
    }

    let createdRoom = await insertRoom(formData.room);

    if (!createdRoom) {
        return;
    }

    let createdUserRoom = await insertUsersRoom(createdUser[0], createdRoom[0]);

    if (!createdUserRoom) {
        return;
    }
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

    console.log(data);

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

    console.log(data);

    return data;
}

async function insertUsersRoom(user: any, room: any) {

    let userRoomObj = <UsersRoom>{
        user_id: user.id,
        room_id: room.id,
        role_id: 2 // GM
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