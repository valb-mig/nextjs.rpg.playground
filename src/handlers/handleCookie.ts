"use server";

import { cookies } from "next/headers";

export async function setUserCookies (userInfo: UserInfo) {
    try {
        cookies().set({
            name: 'userInfo',
            value: JSON.stringify(userInfo),
            httpOnly: true,
        });
    } catch (error) {
        console.error("[Helper]", error);
    }
}

export async function checkRoom(url: string) {

    let userCookies = cookies().get('userInfo');

    if(userCookies != null) {

        let userObject = JSON.parse(userCookies.value);

        if(userObject.room_code == url)
        {
            return true;
        }
    }
    
    return false;
}