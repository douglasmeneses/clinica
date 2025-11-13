import { z } from "zod";

export const createPacienteSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome não pode ter mais de 255 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  telefone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos")
    .optional()
    .or(z.literal("")),
  dataNascimento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

export const updatePacienteSchema = createPacienteSchema.extend({
  id: z.number(),
});

export type CreatePacienteInput = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteInput = z.infer<typeof updatePacienteSchema>;
