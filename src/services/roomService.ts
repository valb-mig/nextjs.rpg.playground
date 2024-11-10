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
       role:roles_tb!inner (
        id,
        name
      ),
      info:characters_info_tb!left (
        character_id,
        life,
        xp,
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

export const selectPublicRooms = async (): Promise<RoomData[] | null> => {
  const { data, error } = await supabase
    .from("rooms_tb")
    .select(`
      id,
      room,
      name,
      created_at,
      open,
      config:room_config_tb!inner(
        room_id,
        privacy,
        max
      )
    `)
    .eq("config.privacy", "PUB")
    .eq("open", true);
  
  if (error || !data) {
    return null;
  }

  const rooms: RoomData[] = [];

  data.map((ln) => {

    let config = null;

    if(ln.config) {
      config = ln.config[0];
    }

    rooms.push({
      id: ln.id,
      room: ln.room,
      name: ln.name,
      max: config?.max ?? 0,
      privacy: config?.privacy ?? "PUB",
      status: config?.status ?? true,
      created_at: ln.created_at
    });
  })

  return rooms;
}

export const selectRoomData = async (uuid: string, room: string) => {

  if(!checkUserRoomExists(uuid, room)) {
    return;
  }
  
  const { data, error } = await supabase
    .from("rooms_tb")
    .select(`
        id,
        room,
        name,
        created_at,
        config:room_config_tb!inner(
          max,
          privacy
        ),
        stats:room_stats_tb!left(
          room_id,
          stat,
          value,
          updated_at
        )
    `)
    .eq("room", room)
    .single();

  if (error || !data) {
    return;
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
    return false;
  }

  return data.id;
};

export const insertRoom = async (
  uuid: string, 
  form: { 
    privacy: 'PUB' | 'PRIV',
    name: string, 
    max: number
  }): Promise<string | undefined> => {

  const userData = await selectUserData(uuid);

  if (!userData) {
    throw new Error("User not found");
  }

  const roomHash = randomUrl();

  const { data, error } = await supabase
    .from("rooms_tb")
    .insert([
      {
        name: form.name,
        room: roomHash,
        created_at: new Date().toISOString(),
        open: false
      }
    ])
    .select('id');

  if (error || !data) {
    return;
  }

  await insertRoomConfig(data[0].id, form.max, form.privacy);

  // [INFO] Create GM character
  await insertCharacterData(userData.id, data[0].id, userData.username);

  return roomHash;
};

export const updateRoomSettings = async(roomId: number, stats: string[]) => {
  try {
    await insertRoomStats(roomId, stats);
  } catch(e) {
    return false;
  }

  return true;
};

export const insertRoomStats = async(roomId: number, stats: string[]) => {
  
  let updateStats: { room_id: number; stat: string; value: string; }[] = [];

  stats.map((stat) => {
    updateStats.push({
      room_id: roomId,
      stat: stat,
      value: '0'
    });
  })

  const { data, error } = await supabase
  .from("room_stats_tb")
  .insert(updateStats);

  if (error || !data) {
    return;
  }
}

export const insertRoomConfig = async (roomId: number, max: number, privacy: "PUB" | "PRIV") => {

  const { data, error } = await supabase
    .from("room_config_tb")
    .insert([
      {
        room_id: roomId,
        privacy: privacy,
        max: max
      }
    ]);

  if (error || !data) {
    return;
  }
}

const selectUserData = async (uuid: string): Promise<{
  id: number,
  uuid: string,
  username: string,
  name: string
} | undefined> => {

  const { data, error } = await supabase
    .from("users_tb")
    .select(
      `
      id,
      uuid,
      username,
      name
    `,
    )
    .eq("uuid", uuid)
    .single();

  if (error || !data) {
    return;
  }

  return data;
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
