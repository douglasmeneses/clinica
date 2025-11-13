import { z } from "zod";

export const createConsultaSchema = z.object({
  dataHora: z.string().min(1, "Data e hora são obrigatórias"),
  motivo: z.string().optional(),
  pacienteId: z
    .number({ message: "Paciente é obrigatório" })
    .int()
    .positive("Selecione um paciente válido"),
  medicoId: z
    .number({ message: "Médico é obrigatório" })
    .int()
    .positive("Selecione um médico válido"),
});

export const updateConsultaSchema = createConsultaSchema.extend({
  id: z.number().int().positive(),
});
