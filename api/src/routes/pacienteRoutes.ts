import { Router } from "express";
import {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacienteController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createPacienteSchema,
  updatePacienteSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de Pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - dataNascimento
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/pacientes", validateBody(createPacienteSchema), createPaciente);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Retorna todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pacientes", getAllPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pacientes/:id", validateParams(idParamSchema), getPacienteById);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualiza um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/pacientes/:id",
  validateParams(idParamSchema),
  validateBody(updatePacienteSchema),
  updatePaciente
);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Deleta um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/pacientes/:id", validateParams(idParamSchema), deletePaciente);

export default router;
