import axios from "axios";
import type { Secretario } from "../types/secretario";

const API_BASE = "http://localhost:3333";

export const login = async (
  email: string,
  senha: string
): Promise<Secretario> => {
  const response = await axios.post<Secretario>(`${API_BASE}/login`, {
    email,
    senha,
  });
  return response.data;
};
