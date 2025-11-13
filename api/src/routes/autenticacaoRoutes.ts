import { Router } from "express";
import { getSecretarioByLogin } from "../controllers/secretarioController";
import { validateBody } from "../middlewares/validation";
import { loginSecretarioSchema } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Secretarios
 *   description: Gerenciamento de Secretários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um secretário
 *     tags: [Secretarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Paciente registrado no banco
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */

//JWT TOKEN

router.post(
  "/login",
  validateBody(loginSecretarioSchema),
  getSecretarioByLogin
);

export default router;
