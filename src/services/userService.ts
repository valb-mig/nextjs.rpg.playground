import supabase from "@lib/supabaseClient";

import type { User } from "@db/users_tb";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@utils/hashPassword";

import { checkRoomExists } from '@services/roomService';

type FormData = {
  name: string;
  username: string;
  email: string;
  token: string;
};

export const insertUser = async (formData: FormData) => {

  const { hash, salt } = hashPassword(formData.token);

  let user: User = {
    name: formData.name,
    username: formData.username,
    uuid: uuidv4(),
    email: formData.email,
    token: hash,
    salt: salt
  };

  try {

    const { data, error } = await supabase
      .from("users_tb")
      .insert([user])
      .select();

    if (!data || error) {
      throw new Error("Error creating user");
    }

  } catch (error: any) {
    throw new Error(error.message);
  }

  return user;
};

type FormUser = {
  username?: string;
  email?: string;
};

export const updateUserData = async(uuid: string, formUser: FormUser) => {

  try {

    if (!selectUserData(uuid)) {
      throw new Error("User not found");
    }

    const { data, error } = await supabase
      .from("users_tb")
      .update(formUser)
      .eq('uuid', uuid)
      .select();

    if(error || !data) {
      throw new Error("Error trying to update user");  
    }

    return {
      username: data[0].username,
      email: data[0].email
    };

  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const selectCharactersInfo = async (uuid: string) => {

  try {
    const { data, error } = await supabase
      .from("users_tb")
      .select(`
        id,
        uuid, 
        characters:users_characters_tb (
          id,
          name,
          room_id,
          user_id,
          role_id,

          room:rooms_tb!inner (
            id,
            name,
            room,
            created_at,
            open
          ),

          role:roles_tb!inner (
            id,
            name
          )
        )
      `)
      .eq("uuid", uuid)
      .eq("characters.room.open", true);

    if (!data || error) {
      throw new Error(error.message);
    }
    
    return data[0];
    
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const selectUserRoom = async (uuid: string, room: string) => {

  let roomId = await checkRoomExists(room);

  if(!roomId) {

    return {
      status: "error",
      message: "Room don't exist"
    }
  }
    
  const { data, error } = await supabase
    .from("users_tb")
    .select(`
      id,
      uuid,

      characters:users_characters_tb (
        room_id,
        user_id,
        role_id,

        room:rooms_tb (
          id,
          open
        )
      )
    `)
    .eq("uuid", uuid)
    .eq("characters.room_id", roomId);

  if (!data || error) {

    return {
      code: 401,
      status: "error",
      message: "Character is not in room"
    }
  }

  return {
    code: 200,
    status: "success",
    data: data
  };
};

export const selectUserData = async (uuid: string) => {
  try {
    const { data, error } = await supabase
      .from("users_tb")
      .select(`
        id,
        uuid, 
        name,
        username,
        xp,
        email
      `)
      .eq("uuid", uuid);

    if (error) {
      throw new Error(error.message);
    }

    if (!data[0]) {
      throw new Error("User not found");
    }
  
    let user: UserData = {
      id:    data[0].id,
      uuid:  data[0].uuid,
      xp:    data[0].xp,
      name:  data[0].name,
      username:  data[0].username,
      email: data[0].email
    };

    return user;
    
  } catch (error: any) {
    throw new Error(error.message);
  }
};