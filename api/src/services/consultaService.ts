import { prisma } from "../database/prisma";
import { Consulta } from "../generated/prisma";

type ConsultaCreateData = Omit<Consulta, "id" | "createdAt" | "updatedAt">;
type ConsultaUpdateData = Partial<
  Omit<Consulta, "id" | "createdAt" | "updatedAt" | "pacienteId" | "medicoId">
>;

export const create = async (data: ConsultaCreateData): Promise<Consulta> => {
  const { pacienteId, medicoId } = data;

  const paciente = await prisma.paciente.findUnique({
    where: { id: pacienteId },
  });
  if (!paciente) throw new Error("Paciente não encontrado");

  const medico = await prisma.medico.findUnique({ where: { id: medicoId } });
  if (!medico) throw new Error("Médico não encontrado");

  return prisma.consulta.create({
    data: { ...data, dataHora: new Date(data.dataHora) },
  });
};

export const getAll = async () => {
  return prisma.consulta.findMany({
    include: {
      paciente: { select: { nome: true, cpf: true } },
      medico: { select: { nome: true, especialidade: true } },
    },
  });
};

export const getById = async (id: number) => {
  return prisma.consulta.findUnique({
    where: { id },
    include: { paciente: true, medico: true },
  });
};

export const update = async (
  id: number,
  data: ConsultaUpdateData
): Promise<Consulta> => {
  return prisma.consulta.update({
    where: { id },
    data: {
      ...data,
      dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
    },
  });
};

export const remove = async (id: number): Promise<Consulta> => {
  return prisma.consulta.delete({ where: { id } });
};
