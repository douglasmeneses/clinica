import axios from "axios";
import type { Medico } from "../types/medico";

const API_URL = "http://localhost:3333";

export const getMedicos = async (): Promise<Medico[]> => {
  const response = await axios.get(`${API_URL}/medicos`);
  return response.data;
};
