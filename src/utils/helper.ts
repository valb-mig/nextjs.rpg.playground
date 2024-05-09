import type { UserInfo } from '@/types/interfaces';

export function getUserData() {
    
    let userObject = localStorage.getItem('userInfo');

    if(userObject != null) {

        let userValues = JSON.parse(userObject);

        let userData: UserInfo = {
            character_name: userValues.character_name,
            room_code: userValues.room_code,
            position: undefined
        }

        return userData;
    }
}