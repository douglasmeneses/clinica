import axios from "axios";
import type { Secretario } from "../types/secretario";
import { API_ENDPOINTS, API_TIMEOUT } from "../config/api";

export const login = async (email: string, senha: string): Promise<Secretario> => {
  const response = await axios.post<Secretario>(
    API_ENDPOINTS.LOGIN,
    {
      email,
      senha,
    },
    {
      timeout: API_TIMEOUT,
    }
  );
  return response.data;
};
