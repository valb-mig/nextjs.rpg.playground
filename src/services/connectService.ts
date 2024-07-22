"use client";

import supabase from "@lib/supabaseClient";
import { verifyPassword } from "@utils/hashPassword";

type FormData = {
  name: string;
  token: string;
};

type SelectedUser = {
  id: string;
  uuid: string;
  name: string;
  token: string;
  salt: string;
}

export const getUserData = async (formData: FormData ): Promise<ResponseObject<SelectedUser>> => {

  let selectedUser = await selectUser(formData.name) 

  if (!selectedUser) {
    return {
      status: "error",
      message: "User not found"
    };
  }

  const isMatch = verifyPassword(formData.token, selectedUser.token, selectedUser.salt);

  if(!isMatch) {
    return {
      status: "error",
      message: "Invalid token"
    };
  }

  return {
    status: "success",
    data: selectedUser
  };
};

const selectUser = async (name: string): Promise<SelectedUser | undefined> => {
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
    .eq("name", name)
    .single();

  if (error || !data) {
    return;
  }

  return data;
};
