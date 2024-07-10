"use client";

import supabase from "@lib/supabaseClient";
import { verifyPassword } from "@utils/hashPassword";

type FormData = {
  name: string;
  token: string;
};

export const getUserData = async (formData: FormData) => {

  try {

    let selectedUser = await selectUser(formData.name) 

    if (!selectedUser) {
      return;
    }

    const isMatch = verifyPassword(formData.token, selectedUser.token, selectedUser.salt);

    if(!isMatch) {
      return;
    }

    return selectedUser;

  } catch (e) {
    console.error("[connectHelper]: ", e);
  }
  
  return;
};

const selectUser = async (name: string) => {
  const { data, error } = await supabase
    .from("users_tb")
    .select(
      `
      id,
      uuid,
      name,
      token,
      salt
    `,
    )
    .eq("name", name);

  if (error) {
    console.error(error);
    return;
  }

  if (!data) {
    return;
  }

  return data[0];
};
