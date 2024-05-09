type MapPosition = {
    row: number,
    col: number
}

export interface UserInfo {
    character_name: string,
    room_code: string,
    position: MapPosition | undefined
}


export interface RoomUsersObject {
    [index: string]: UserInfo;
}