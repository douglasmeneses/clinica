import axios from "axios";
import type { Consulta } from "../types/consulta";

const API_URL = "http://localhost:3333";

export const getConsultas = async (): Promise<Consulta[]> => {
  const response = await axios.get(`${API_URL}/consultas`);
  return response.data;
};

export const deleteConsulta = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/consultas/${id}`);
};

export const updateConsulta = async (
  id: number,
  dados: Partial<Consulta>
): Promise<Consulta> => {
  const response = await axios.put(`${API_URL}/consultas/${id}`, dados);
  return response.data;
};

export const createConsulta = async (
  dados: Omit<Consulta, "id">
): Promise<Consulta> => {
  const response = await axios.post(`${API_URL}/consultas`, dados);
  return response.data;
};
