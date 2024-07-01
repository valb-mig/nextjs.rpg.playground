"use client";

import supabase from "@lib/supabaseClient";

type FormData = {
  name: string;
  token: string;
};

export const getUserData = async (formData: FormData) => {

  try {
    return await selectUser(formData.name, formData.token) 
  } catch (e) {
    console.error("[Helper] Error tying to login user: ", e);
  }
  
  return;
};

const selectUser = async (name: string, token: string) => {
  const { data, error } = await supabase
    .from("users_tb")
    .select(
      `
      id,
      uuid,
      name,
      token,
      users_room_tb (
        user_id, 
        room_id,
        role_id
      )
    `,
    )
    .eq("name", name)
    .eq("token", token);

  if (error) {
    console.error(error);
    return;
  }

  if (!data) {
    return;
  }

  return data[0];
};
