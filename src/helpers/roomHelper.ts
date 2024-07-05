"use client";

import supabase from "@lib/supabaseClient";

export const checkRoomExists = async (roomName: string) => {
  const { data, error } = await supabase
    .from("rooms_tb")
    .select("id")
    .eq("room", roomName)
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