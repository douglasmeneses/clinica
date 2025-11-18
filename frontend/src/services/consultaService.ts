import axios from "axios";
import type { Consulta } from "../types/consulta";
import { API_ENDPOINTS, API_TIMEOUT } from "../config/api";

export const getConsultas = async (): Promise<Consulta[]> => {
  const response = await axios.get(API_ENDPOINTS.CONSULTAS, {
    timeout: API_TIMEOUT,
  });
  return response.data;
};

export const deleteConsulta = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.CONSULTAS}/${id}`, {
    timeout: API_TIMEOUT,
  });
};

export const updateConsulta = async (id: number, dados: Partial<Consulta>): Promise<Consulta> => {
  const response = await axios.put(`${API_ENDPOINTS.CONSULTAS}/${id}`, dados, {
    timeout: API_TIMEOUT,
  });
  return response.data;
};

export const createConsulta = async (dados: Omit<Consulta, "id">): Promise<Consulta> => {
  const response = await axios.post(API_ENDPOINTS.CONSULTAS, dados, {
    timeout: API_TIMEOUT,
  });
  return response.data;
};
