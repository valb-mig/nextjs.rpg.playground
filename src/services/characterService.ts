import supabase from "@lib/supabaseClient";

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

export const insertCharacter = async (uuid: string, room: string, characterData: CharacterData): Promise<boolean> => {

  try {

    const userId = await checkUser(uuid);

    if (!userId) {
      throw new Error("User not found");
    }

    const roomId = await checkRoom(room);

    if (!roomId) {
      throw new Error("Room not found");
    }

    if(await checkCharacterInRoom(userId, roomId)) {
      throw new Error("Character already in room");
    }

    let characterId = await insertCharacterData(userId, roomId, characterData);

    // TODO: Insert character stats
    // await insertCharacterStatsData(characterId, characterData);

    await insertCharacterInfoData(characterId, characterData);

    return true;

  } catch (error: any) {
    throw new Error(error.message);
  }
};

const insertCharacterInfoData = async (characterId: number, characterData: CharacterData) => {
  
  const { error } = await supabase
    .from("characters_info_tb")
    .insert([
      {
        character_id: characterId,
        life: 100,
        notes: characterData.notes,
        age: characterData.age,
        role: characterData.role,
        race: characterData.race,
        xp: 0,
        gold: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

  if (error) {
    throw new Error("Character info not inserted");
  }
};

const insertCharacterStatsData = async (characterId: number, characterData: CharacterData) => {
  
  const { data, error } = await supabase
    .from("characters_stats_tb")
    .insert([
      {
      },
    ]);

  if (error || !data) {
    throw new Error("Character stats not inserted");
  }
};

const insertCharacterData = async (userId: number, roomId: number, characterData: CharacterData) => {
  
  const { data, error } = await supabase
    .from("users_characters_tb")
    .insert([
      {
        user_id: userId,
        room_id: roomId,
        role_id: 1, // Player
        name: characterData.name,
      },
    ])
    .select('id');

  if (error || !data) {
    throw new Error("Character data not inserted");
  }

  return data[0].id;
};

const checkRoom = async (room: string): Promise<number | undefined> => {
  
  const { data, error } = await supabase
    .from("rooms_tb")
    .select(
      `
      id,
      room
    `,
    )
    .eq("room", room)
    .single();
  
  if (error || !data) {
    return;
  }
  
  return data.id;
};

const checkCharacterInRoom = async (userId: number, roomId: number): Promise<boolean> => {

  const { data, error } = await supabase
    .from("users_characters_tb")
    .select(
      `
      id,
      user_id,
      room_id
    `,
    )
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .single();

  if (error || !data) {
    return false;
  }

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