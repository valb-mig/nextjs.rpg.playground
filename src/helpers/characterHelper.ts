import supabase from "@lib/supabaseClient";

import type { UsersCharacters } from "@db/users_characters_tb";

export const selectCharacterData = async (uuid: string, room: string) => {
  
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
};