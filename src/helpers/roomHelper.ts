"use client";

import supabase from '@lib/supabaseClient';

import type { Room } from '@db/rooms_tb';

export const checkRoomExists = async (roomName: string) => {

  const { data, error } = await supabase
    .from('rooms_tb')
    .select('id')
    .eq('room', roomName)
    .single();

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}