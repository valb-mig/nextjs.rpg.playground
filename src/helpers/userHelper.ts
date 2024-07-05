import supabase from "@lib/supabaseClient";

import type { User } from "@db/users_tb";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@utils/hashPassword";

type FormData = {
  name: string;
  email: string;
  token: string;
};

export const insertUser = async (formData: FormData) => {

  const { hash, salt } = hashPassword(formData.token);

  let user: User = {
    uuid: uuidv4(),
    email: formData.email,
    name: formData.name,
    token: hash,
    salt: salt
  };

  try {

    const { data, error } = await supabase
      .from("users_tb")
      .insert([user])
      .select();

    if (error) {
      console.log(error);
      return;
    }

    if (!data) {
      throw new Error("Error creating user");
    }

  } catch (error: any) {
    throw new Error(error.message);
  }

  return user;
};

export const selectCharactersInfo = async (uuid: string) => {

  try {
    const { data, error } = await supabase
      .from("users_tb")
      .select(`
        id,
        uuid, 
        users_characters_tb (
          id,
          name,
          room_id,
          user_id,
          role_id,

          rooms_tb!inner (
            id,
            name,
            room,
            created_at
          ),

          roles_tb!inner (
            id,
            name
          )
        )
      `)
      .eq("uuid", uuid);

    if (error) {
      throw new Error(error.message);
    }

    if (!data[0]) {
      throw new Error("User characters info not found");
    }
  
    return data[0];
    
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const selectUserRoom = async (uuid: string, room: string) => {
  try {

    const { data: roomsData, error: roomsError } = await supabase
      .from("rooms_tb")
      .select("id")
      .eq("room", room)
      .single();
    
    if (roomsError) {
      throw new Error("Room don't exist");
    }

    const { data, error } = await supabase
      .from("users_tb")
      .select(`
        id,
        uuid, 
        users_characters_tb (
          room_id,
          user_id
        )
      `)
      .eq("uuid", uuid)
      .eq("users_characters_tb.room_id", roomsData.id);

    if (error) {
      throw new Error("Room is not avaliable");
    }

    return data;

  } catch (error: any) {
    throw new Error(error.message);
  }
}
