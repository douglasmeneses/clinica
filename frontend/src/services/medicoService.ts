import axios from "axios";
import type { Medico } from "../types/medico";
import { API_ENDPOINTS } from "../config/api";

export const getMedicos = async (): Promise<Medico[]> => {
  const response = await axios.get(API_ENDPOINTS.MEDICOS);
  return response.data;
};
