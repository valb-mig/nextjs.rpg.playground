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

interface CookieData {
  uuid: string;
  name: string;
}
interface RoomInfo {
  id: string;
  room: string;
  name: string;
  role?: string;
  character: string;
  created_at: string;
}

interface RoomUsersObject {
  [index: string]: UserInfo;
}

interface ErrorObject {
  message: string;
}

interface DbDefault {
  id?: number;
  created_at?: string;
}