import { Request, Response } from 'express';
import * as consultaService from '../services/consultaService';

export const createConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await consultaService.create(req.body);
    return res.status(201).json(consulta);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await consultaService.getAll();
    return res.json(consultas);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConsultaById = async (req: Request, res: Response) => {
  try {
    const consulta = await consultaService.getById(Number(req.params.id));
    if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });
    return res.json(consulta);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await consultaService.update(Number(req.params.id), req.body);
    return res.json(consulta);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Consulta não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteConsulta = async (req: Request, res: Response) => {
  try {
    await consultaService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Consulta não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};