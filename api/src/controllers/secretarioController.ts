import { Request, Response } from "express";
import * as secretarioService from "../services/secretarioService";

export const createSecretario = async (req: Request, res: Response) => {
  try {
    const secretario = await secretarioService.create(req.body);
    return res.status(201).json(secretario);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email já está em uso." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSecretarios = async (req: Request, res: Response) => {
  try {
    const secretarios = await secretarioService.getAll();
    return res.json(secretarios);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSecretarioById = async (req: Request, res: Response) => {
  try {
    const secretario = await secretarioService.getById(Number(req.params.id));
    if (!secretario)
      return res
        .status(404)
        .json({ message: "Secretário(a) não encontrado(a)." });
    return res.json(secretario);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSecretario = async (req: Request, res: Response) => {
  try {
    const secretario = await secretarioService.update(
      Number(req.params.id),
      req.body
    );
    return res.json(secretario);
  } catch (error: any) {
    if (error.code === "P2025")
      return res
        .status(404)
        .json({ message: "Secretário(a) não encontrado(a)." });
    if (error.code === "P2002")
      return res.status(409).json({ message: "Email já está em uso." });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSecretario = async (req: Request, res: Response) => {
  try {
    await secretarioService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res
        .status(404)
        .json({ message: "Secretário(a) não encontrado(a)." });
    return res.status(500).json({ message: error.message });
  }
};

export const getSecretarioByLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const secretario = await secretarioService.getByLogin(email, senha);
    if (!secretario)
      return res.status(404).json({ message: "Credenciais inválidas" });
    return res.json(secretario);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
