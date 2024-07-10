interface RoomData {
  location?: string;
  showcase?: string;
}

// interface UserInfo {
//   uuid: string;
//   name: string;
//   room: string;
//   position?: MapPosition;
//   dice?: number;
//   role?: string;
// }

/* Room */

interface RoomInfo {
  id: string;
  room: string;
  name: string;
  role?: string;
  character?: string;
  created_at: string;
}

/* Characters */

interface CharacterInfo {
  name: string;
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
  room: string;
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

interface ResponseObject {
  status: "success" | "error";
  message: string;
  data: any;  
}
