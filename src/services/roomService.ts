"use client";

import supabase from "@lib/supabaseClient";

export const selectCharacterData = async (uuid: string, room: string) => {

  if(!checkUserRoomExists(uuid, room)) {
    return null;
  }

  let characterId =  await selectCharacterId(uuid, room);
  
  const { data, error } = await supabase
    .from("users_characters_tb")
    .select(`
      id,
      name,
      room_id,
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

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

const selectCharacterId = async (uuid: string, room: string) => {

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

  if (error) {
    console.log("[Database]: ", error);
    return null;
  }

  if (!data) {
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

  if (error) {
    console.log("[Database]: ", error);
    return false;
  }

  if (!data) {
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

  if (error) {
    console.log(error);
    return false;
  }

  if (!data) {
    return false;
  }

  return true;
};

export const enterRoom = async (uuid: string, room: string) => {
  // const { data, error } = await supabase
};