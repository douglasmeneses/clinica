import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(4, "Senha com menos de 4 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;
