interface RoomData {
  location?: string;
  showcase?: string;
}

interface MapPosition {
  row: number;
  col: number;
}

interface UserInfo {
  uuid: string;
  name: string;
  room: string;
  position?: MapPosition;
  dice?: number;
  role?: string;
}

interface RoomUsersObject {
  [index: string]: UserInfo;
}
