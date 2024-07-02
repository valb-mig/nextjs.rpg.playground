"use client";

import supabase from "@lib/supabaseClient";

import type { User } from "@db/users_tb";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, verifyPassword } from "@utils/hashPassword";

type FormData = {
  name: string;
  token: string;
};

export const insertUser = async (formData: FormData) => {

  const { hash, salt } = await hashPassword(formData.token);

  let user: User = {
    uuid: uuidv4(),
    name: formData.name,
    token: hash,
    salt: salt
  };

  try {

    const { data, error } = await supabase
      .from("users_tb")
      .insert([user])
      .select();

    if (error) {
      console.log(error);
      return;
    }

    if (!data) {
      throw new Error("Error creating user");
    }

  } catch (error: any) {
    throw new Error(error.message);
  }

  return user;
};