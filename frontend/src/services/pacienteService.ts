import axios from "axios";
import type { Paciente } from "../types/paciente";
import { API_ENDPOINTS, API_TIMEOUT } from "../config/api";

export const getPacientes = async (): Promise<Paciente[]> => {
  const res = await axios.get<Paciente[]>(API_ENDPOINTS.PACIENTES, {
    timeout: API_TIMEOUT,
  });
  return res.data;
};

export const deletePaciente = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.PACIENTES}/${id}`, {
    timeout: API_TIMEOUT,
  });
};

export const updatePaciente = async (id: number, dados: Paciente): Promise<Paciente> => {
  const res = await axios.put<Paciente>(`${API_ENDPOINTS.PACIENTES}/${id}`, dados, {
    timeout: API_TIMEOUT,
  });
  return res.data;
};

export const createPaciente = async (dados: Omit<Paciente, "id">): Promise<Paciente> => {
  const res = await axios.post<Paciente>(API_ENDPOINTS.PACIENTES, dados, {
    timeout: API_TIMEOUT,
  });
  return res.data;
};

export default {
  getPacientes,
  deletePaciente,
  updatePaciente,
  createPaciente,
};
