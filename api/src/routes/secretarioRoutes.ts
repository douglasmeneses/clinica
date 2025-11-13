import { Router } from "express";
import {
  createSecretario,
  getAllSecretarios,
  getSecretarioById,
  updateSecretario,
  deleteSecretario,
} from "../controllers/secretarioController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createSecretarioSchema,
  updateSecretarioSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Secretarios
 *   description: Gerenciamento de Secretários
 */

/**
 * @swagger
 * /secretarios:
 *   post:
 *     summary: Cria um novo secretário que irá usar o sistema
 *     tags: [Secretarios]
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
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Secretário criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/secretarios",
  validateBody(createSecretarioSchema),
  createSecretario
);

/**
 * @swagger
 * /secretarios:
 *   get:
 *     summary: Retorna todos os secretários cadastradpos no banco
 *     tags: [Secretarios]
 *     responses:
 *       200:
 *         description: Lista de secretários
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/secretarios", getAllSecretarios);

/**
 * @swagger
 * /secretarios/{id}:
 *   get:
 *     summary: Retorna um secretário pelo ID
 *     tags: [Secretarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Secretário encontrado
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/secretarios/:id",
  validateParams(idParamSchema),
  getSecretarioById
);

/**
 * @swagger
 * /secretarios/{id}:
 *   put:
 *     summary: Atualiza um secretário
 *     tags: [Secretarios]
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
 *         description: Secretário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/secretarios/:id",
  validateParams(idParamSchema),
  validateBody(updateSecretarioSchema),
  updateSecretario
);

/**
 * @swagger
 * /secretarios/{id}:
 *   delete:
 *     summary: Deleta um secretário
 *     tags: [Secretarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Secretário deletado com sucesso
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/secretarios/:id",
  validateParams(idParamSchema),
  deleteSecretario
);

export default router;
