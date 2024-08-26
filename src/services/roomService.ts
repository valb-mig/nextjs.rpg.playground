"use client";

import supabase from "@lib/supabaseClient";
import randomUrl from "@/utils/randomUrl";

export const selectCharacterData = async (uuid: string, room: string) => {

  if(!checkUserRoomExists(uuid, room)) {
    return {
      status: "error",
      message: "OOPS! Invalid room"
    };
  }

  let characterId =  await selectCharacterId(uuid, room);
  
  const { data, error } = await supabase
    .from("users_characters_tb")
    .select(`
      id,
      name,
      room_id,
      role_id,
      role:roles_tb (
        name
      ),
      info:characters_info_tb (
        character_id,
        life,
        notes,
        age,
        gold
      ),
      inventory:characters_inventory_tb!left (
        character_id,
        id,
        item,
        icon,
        quant,
        active
      ),
      stats:characters_stats_tb!left (
        character_id,
        stat,
        value
      ),
      rooms_tb (
        id,
        room
      )
    `)
    .eq("id", characterId)
    .single();

  if (error || !data) {
    return {
      status: "error",
      message: "OOPS! Invalid room"
    };
  }

  return {
    status: "success",
    data: data
  };
};

const selectCharacterId = async (uuid: string, room: string): Promise<number | null> => {

  const { data, error } = await supabase
    .from("users_tb")
    .select(`
      id,
      uuid, 
      users_characters_tb (
        id,
        user_id,
        room_id,
        rooms_tb (
          id,
          room
        )
      )
    `)
    .eq("uuid", uuid)
    .eq("users_characters_tb.rooms_tb.room", room)
    .single();

  if (error || !data) {
    return null;
  }

  return data.users_characters_tb[0].id;
};

export const selectRoomData = async (uuid: string, room: string) => {

  if(!checkUserRoomExists(uuid, room)) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("rooms_tb")
    .select(`
        id,
        room,
        name,
        created_at
    `)
    .eq("room", room)
    .single();

  if (error) {
    console.log("[Database]: ", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data;
};

export const checkUserRoomExists = async (uuid: string, room: string) => {
  const { data, error } = await supabase
    .from("users_tb")
    .select(`
      id,
      uuid, 
      users_characters_tb (
        user_id,
        room_id,
        rooms_tb (
          id,
          room
        )
      )
    `)
    .eq("uuid", uuid)
    .eq("users_characters_tb.rooms_tb.room", room)
    .single();

  if (error || !data) {
    console.log(error);
    return false;
  }

  return true;
};

export const checkRoomExists = async (room: string) => {
  
  const { data, error } = await supabase
    .from("rooms_tb")
    .select("id")
    .eq("room", room)
    .single();

  if (error || !data) {
    console.log(error);
    return false;
  }
  
  return true;
};

export const enterRoom = async (uuid: string, room: string) => {};

export const insertRoom = async (
  uuid: string, 
  name: string,
  form: { 
    name: string, 
    max: string 
  }): Promise<boolean> => {

  const userId = await checkUser(uuid);

  if (!userId) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("rooms_tb")
    .insert([
      {
        name: form.name,
        room: randomUrl(),
        created_at: new Date().toISOString()
      }
    ])
    .select('id');

  if (error || !data) {
    return false;
  }
  
  // [TODO] Insert room stats

  const characterId = await insertCharacterData(userId, data[0].id, name);

  return true;
};

const checkUser = async (uuid: string): Promise<number | undefined> => {

  const { data, error } = await supabase
    .from("users_tb")
    .select(
      `
      id,
      uuid
    `,
    )
    .eq("uuid", uuid)
    .single();

  if (error || !data) {
    return;
  }

  return data.id;
};

const insertCharacterData = async (userId: number, roomId: number, userName: string) => {
  
  const { data, error } = await supabase
    .from("users_characters_tb")
    .insert([
      {
        user_id: userId,
        room_id: roomId,
        role_id: 2, // GM
        name: userName,
      },
    ])
    .select('id');

  if (error || !data) {
    throw new Error("Character data not inserted");
  }

  return data[0].id;
};
