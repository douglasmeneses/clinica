import { z } from "zod";

// Schema para Secretário
export const createSecretarioSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres")
    .optional(),
});

export const loginSecretarioSchema = z.object({
  email: z
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  senha: z
    .string()
    .min(4, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
});
export const updateSecretarioSchema = createSecretarioSchema.partial();

// Schema para Médico
export const createMedicoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  crm: z
    .string()
    .min(4, "CRM deve ter pelo menos 4 caracteres")
    .max(20, "CRM deve ter no máximo 20 caracteres")
    .regex(/^\d+$/, "CRM deve conter apenas números"),
  especialidade: z
    .string()
    .min(2, "Especialidade deve ter pelo menos 2 caracteres")
    .max(100, "Especialidade deve ter no máximo 100 caracteres"),
});

export const updateMedicoSchema = createMedicoSchema.partial();

// Schema para Paciente
export const createPacienteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  cpf: z
    .string()
    .length(11, "CPF deve ter exatamente 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres")
    .optional(),
  dataNascimento: z
    .string()
    .refine((date: string) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data de nascimento deve ser uma data válida")
    .refine((date: string) => {
      const parsedDate = new Date(date);
      const today = new Date();
      return parsedDate < today;
    }, "Data de nascimento deve ser no passado"),
});

export const updatePacienteSchema = createPacienteSchema.partial();

// Schema para Consulta
export const createConsultaSchema = z.object({
  dataHora: z
    .string()
    .refine((date: string) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data e hora devem ser válidas")
    .refine((date: string) => {
      const parsedDate = new Date(date);
      const now = new Date();
      return parsedDate > now;
    }, "Data e hora da consulta devem ser no futuro"),
  pacienteId: z
    .number()
    .int("ID do paciente deve ser um número inteiro")
    .positive("ID do paciente deve ser positivo"),
  medicoId: z
    .number()
    .int("ID do médico deve ser um número inteiro")
    .positive("ID do médico deve ser positivo"),
  motivo: z.string().max(500, "Motivo deve ter no máximo 500 caracteres").optional(),
});

export const updateConsultaSchema = createConsultaSchema.partial();

// Schema para validação de IDs
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num: number) => num > 0, "ID deve ser positivo"),
});

// Tipos TypeScript derivados dos schemas
export type CreateSecretarioData = z.infer<typeof createSecretarioSchema>;
export type UpdateSecretarioData = z.infer<typeof updateSecretarioSchema>;
export type CreateMedicoData = z.infer<typeof createMedicoSchema>;
export type UpdateMedicoData = z.infer<typeof updateMedicoSchema>;
export type CreatePacienteData = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteData = z.infer<typeof updatePacienteSchema>;
export type CreateConsultaData = z.infer<typeof createConsultaSchema>;
export type UpdateConsultaData = z.infer<typeof updateConsultaSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
