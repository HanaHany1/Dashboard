import axios from "axios";

export interface Branch {
  id: string;
  name: string;
}

export async function getBranches(): Promise<Branch[]> {
  const res = await axios.get("http://localhost:5000/api/branches");
  return res.data;
}
