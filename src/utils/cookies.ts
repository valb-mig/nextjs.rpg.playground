"use server";

import { cookies } from "next/headers";

export async function setUserCookies(userInfo: { uuid: string; name: string }) {
  try {
    cookies().set({
      name: "session_rpg_playground",
      value: JSON.stringify(userInfo),
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      sameSite: "strict",
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
    let userObject: CookieData = JSON.parse(userCookies.value);
    return userObject;
  }

  return null;
}