"use server";

import { cookies } from "next/headers";

export async function setUserCookies(userInfo: { uuid: string; name: string }) {
  try {
    cookies().set({
      name: "session_rpg_playground",
      value: JSON.stringify(userInfo),
      httpOnly: true,
    });
  } catch (error) {
    console.error("[Cookie]", error);
  }
}

export async function checkSession() {
  return cookies().has("session_rpg_playground");
}

export async function getUserCookies() {
  let userCookies = cookies().get("session_rpg_playground");

  if (userCookies != null) {
    let userObject = JSON.parse(userCookies.value);
    return userObject;
  }

  return null;
}

export async function checkRoom(url: string) {
  let userCookies = cookies().get("session_rpg_playground");

  if (userCookies != null) {
    let userObject = JSON.parse(userCookies.value);

    if (userObject.room_code == url) {
      return true;
    }
  }

  return false;
}
