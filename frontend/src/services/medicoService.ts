import axios from "axios";
import type { Medico } from "../types/medico";
import { API_ENDPOINTS, API_TIMEOUT } from "../config/api";

export const getMedicos = async (): Promise<Medico[]> => {
  const response = await axios.get(API_ENDPOINTS.MEDICOS, {
    timeout: API_TIMEOUT,
  });
  return response.data;
};
