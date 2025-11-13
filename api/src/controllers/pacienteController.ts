import { Request, Response } from "express";
import * as pacienteService from "../services/pacienteService";

export const createPaciente = async (req: Request, res: Response) => {
  try {
    const novoPaciente = await pacienteService.create(req.body);
    return res.status(201).json(novoPaciente);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ message: `Campo único já existe: ${error.meta.target}` });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await pacienteService.getAll();
    return res.json(pacientes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPacienteById = async (req: Request, res: Response) => {
  try {
    const paciente = await pacienteService.getById(Number(req.params.id));
    if (!paciente)
      return res.status(404).json({ message: "Paciente não encontrado" });
    return res.json(paciente);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePaciente = async (req: Request, res: Response) => {
  try {
    const paciente = await pacienteService.update(
      Number(req.params.id),
      req.body
    );
    return res.json(paciente);
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Paciente não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

export const deletePaciente = async (req: Request, res: Response) => {
  try {
    await pacienteService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Paciente não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
