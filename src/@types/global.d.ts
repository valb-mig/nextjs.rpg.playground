interface UserRoomsData {
  id: string;
  room: string;
  name: string;
  role?: string;
  character?: string;
  created_at: string;
}

/* User */

interface UserData {
  id:    string;
  uuid:  string;
  xp:    number;
  name:  string;
  email: string;
}

/* User Rooms */

// [ TODO ] Ajust type logic

type RoomStats = {
  stat: string;
  value: string;
  updated_at: string;
}

interface RoomInfo {
  id: string;
  room: string;
  name: string;
  created_at: string;
  config?: {
    max:     any;
    privacy: any;
    status:  any;
  };
  stats?: RoomStats[];
}

interface RoomData extends RoomInfo {
  max: number;
  privacy: "PRV" | "PUB";
  status: true | false;
}

interface RoomSocketInfo extends RoomInfo {
  dice?: number;
  location?: string;
  showcase?: string;
}

/* Characters */

interface CharacterData {
  name: string;
  notes: string;
  race: string;
  role: string;
  age: number;
}

interface CharacterInfo {
  name: string;
  role: string;
  room: string;
  life: number;
  notes: string;
  age: number;
  gold: number;
  character_id: number;
  inventory: CharacterInventory[];
  stats: CharacterStats[];
}

interface CharacterStats {
  stat: string;
  value: string;
}

interface CharacterInventory {
  item: string;
  quant: number;
  icon?: string;
}

interface CharacterSocketInfo extends CharacterInfo {
  dice?: number;
  position?: {
    row: number;
    col: number;
  };
}

interface RoomCharacterSocketInfo {
  [index: string]: CharacterSocketInfo;
}

/* Config */

interface CookieData {
  uuid: string;
  name: string;
}

interface DbDefault {
  id?: number;
  created_at?: string;
}

interface ResponseObject<T> {
  status: "success" | "error";
  message?: string;
  data?: T;  
}
