interface RoomData {
    location?: string,
    showcase?: string
}

interface MapPosition {
    row: number,
    col: number
}

interface UserInfo {
    uuid: string,
    character_name: string,
    room_code: string,
    position?: MapPosition,
    dice?: number,
    role?: string
}

interface RoomUsersObject {
    [index: string]: UserInfo;
}
