export interface RoomStats extends DbDefault {
  room_id: number;
  privacy: "PRV" | "PUB";
  status: true | false;
  max: number;
  updated_at: string;
}