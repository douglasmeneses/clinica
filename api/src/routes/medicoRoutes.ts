import { Router } from "express";
import {
  createMedico,
  getAllMedicos,
  getMedicoById,
  updateMedico,
  deleteMedico,
} from "../controllers/medicoController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createMedicoSchema,
  updateMedicoSchema,
  idParamSchema,
} from "../schemas/validation";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: Gerenciamento de Médicos
 */

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cria um novo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - especialidade
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               crm:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/medicos", validateBody(createMedicoSchema), createMedico);

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Retorna todos os médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/medicos", getAllMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/medicos/:id", validateParams(idParamSchema), getMedicoById);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza um médico
 *     tags: [Medicos]
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
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/medicos/:id",
  validateParams(idParamSchema),
  validateBody(updateMedicoSchema),
  updateMedico
);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Deleta um médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Médico deletado com sucesso
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/medicos/:id", validateParams(idParamSchema), deleteMedico);

export default router;
