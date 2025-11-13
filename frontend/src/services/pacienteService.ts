import axios from "axios";
import type { Paciente } from "../types/paciente";

const API_BASE = "http://localhost:3333";

export const getPacientes = async (): Promise<Paciente[]> => {
  const res = await axios.get<Paciente[]>(`${API_BASE}/pacientes`);
  return res.data;
};

export const deletePaciente = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/pacientes/${id}`);
};

export const updatePaciente = async (
  id: number,
  dados: Paciente
): Promise<Paciente> => {
  const res = await axios.put<Paciente>(`${API_BASE}/pacientes/${id}`, dados);
  return res.data;
};

export const createPaciente = async (
  dados: Omit<Paciente, "id">
): Promise<Paciente> => {
  const res = await axios.post<Paciente>(`${API_BASE}/pacientes`, dados);
  return res.data;
};

export default {
  getPacientes,
  deletePaciente,
  updatePaciente,
  createPaciente,
};
