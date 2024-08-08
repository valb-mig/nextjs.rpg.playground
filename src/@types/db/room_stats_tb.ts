export interface RoomStats extends DbDefault {
  room_id: number;
  stat: string;
  value: number;
  updated_at: string;
}