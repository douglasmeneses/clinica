import { Request, Response } from 'express';
import * as medicoService from '../services/medicoService';

export const createMedico = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.create(req.body);
    return res.status(201).json(medico);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllMedicos = async (req: Request, res: Response) => {
  try {
    const medicos = await medicoService.getAll();
    return res.json(medicos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicoById = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.getById(Number(req.params.id));
    if (!medico) return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    return res.json(medico);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedico = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.update(Number(req.params.id), req.body);
    return res.json(medico);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedico = async (req: Request, res: Response) => {
  try {
    await medicoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};