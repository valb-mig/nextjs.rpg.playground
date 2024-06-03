"use client";

import type { 
    UserInfo 
} from '@/types';

export function getUserData() {
    
    if (typeof window === 'undefined' || localStorage === undefined) {
        return;
    }

    let userObject = localStorage.getItem('userInfo');

    if(userObject != null && userObject != undefined) {
        try {
            let userValues = JSON.parse(userObject);
    
            let userData: UserInfo = {
                uuid: userValues.uuid,
                role: userValues.role,
                character_name: userValues.character_name,
                room_code: userValues.room_code,
                position: userValues.position,
                dice: userValues.dice
            }
    
            return userData;

        } catch(error) {
            console.error(error);
        }
    }
}

export function cleanUserData() {
    localStorage.removeItem('userInfo');
}

export function updateUserData(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}