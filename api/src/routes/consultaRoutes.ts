import { Router } from "express";
import {
  createConsulta,
  getAllConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta,
} from "../controllers/consultaController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createConsultaSchema,
  updateConsultaSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Gerenciamento de Consultas
 */

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataHora
 *               - pacienteId
 *               - medicoId
 *             properties:
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               pacienteId:
 *                 type: integer
 *               medicoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/consultas", validateBody(createConsultaSchema), createConsulta);

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Retorna todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/consultas", getAllConsultas);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/consultas/:id", validateParams(idParamSchema), getConsultaById);

/**
 * @swagger
 * /consultas/{id}:
 *   put:
 *     summary: Atualiza uma consulta
 *     tags: [Consultas]
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
 *               data:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/consultas/:id",
  validateParams(idParamSchema),
  validateBody(updateConsultaSchema),
  updateConsulta
);

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Deleta uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Consulta deletada com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/consultas/:id", validateParams(idParamSchema), deleteConsulta);

export default router;
