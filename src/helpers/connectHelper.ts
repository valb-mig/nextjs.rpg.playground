"use client";

import supabase from '@lib/supabaseClient';

import type { User } from '@db/users_tb';
import type { Room } from '@db/rooms_tb';
import type { UsersRoom } from '@db/users_room_tb';

type FormData = {
    name: string,
    token: string,
    room: string
};

export const loginUser = async (formData: FormData) => {
      
}