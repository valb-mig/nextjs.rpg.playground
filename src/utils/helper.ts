import type { 
    UserInfo 
} from '@/types/interfaces';

export function getUserData() {
    
    if(localStorage == undefined || localStorage == null) {
        return;
    }
    else
    {
        let userObject = localStorage.getItem('userInfo');

        if(userObject != null && userObject != undefined) {
            try {
                let userValues = JSON.parse(userObject);
        
                let userData: UserInfo = {
                    uuid: userValues.uuid,
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
}

export function updateUserData(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}