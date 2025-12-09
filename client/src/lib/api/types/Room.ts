export interface Room {
  id: string;
  branchId: string;
  name: string;
  status: "available" | "occupied" | "maintenance";
  capacity?: number; // optional to avoid ALL errors
}
