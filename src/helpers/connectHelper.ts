"use client";

import supabase from "@lib/supabaseClient";

type FormData = {
  name: string;
  token: string;
};

export const loginUser = async (formData: FormData) => {
  try {
    const user = await selectUser(formData.name, formData.token);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (e) {
    console.error("[useConnect] Error tying to login user: ", e);
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
    console.log(error);
    return;
  }

  if (!data) {
    return;
  }

  return data[0];
};
