import axios from "axios";
import { Room } from "@/lib/api/types/Room";
export async function getRooms(): Promise<Room[]> {
  const res = await axios.get("/api/rooms");
  return res.data;
}
