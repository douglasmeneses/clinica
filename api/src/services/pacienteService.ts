import { prisma } from "../database/prisma";
import { Paciente } from "../generated/prisma";

type PacienteCreateData = Omit<Paciente, "id" | "createdAt" | "updatedAt">;
type PacienteUpdateData = Partial<PacienteCreateData>;

export const create = async (data: PacienteCreateData): Promise<Paciente> => {
  return prisma.paciente.create({
    data: { ...data, dataNascimento: new Date(data.dataNascimento) },
  });
};

export const getAll = async (): Promise<Paciente[]> => {
  return prisma.paciente.findMany();
};

export const getById = async (id: number): Promise<Paciente | null> => {
  return prisma.paciente.findUnique({ where: { id } });
};

export const update = async (
  id: number,
  data: PacienteUpdateData
): Promise<Paciente> => {
  return prisma.paciente.update({
    where: { id },
    data: {
      ...data,
      dataNascimento: data.dataNascimento
        ? new Date(data.dataNascimento)
        : undefined,
    },
  });
};

export const remove = async (id: number): Promise<Paciente> => {
  return prisma.paciente.delete({ where: { id } });
};
