export type MapPosition = {
    row: number,
    col: number
}

export interface UserInfo {
    socket_id: string | undefined,
    character_name: string,
    room_code: string,
    position: MapPosition | undefined,
    dice: number | undefined
}

export interface RoomUsersObject {
    [index: string]: UserInfo;
}
