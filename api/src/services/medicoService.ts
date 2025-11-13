import { prisma } from '../database/prisma';
import { Medico } from '../generated/prisma';

type MedicoCreateData = Omit<Medico, 'id' | 'createdAt' | 'updatedAt'>;
type MedicoUpdateData = Partial<MedicoCreateData>;

export const create = async (data: MedicoCreateData): Promise<Medico> => {
  return prisma.medico.create({ data });
};

export const getAll = async (): Promise<Medico[]> => {
  return prisma.medico.findMany();
};

export const getById = async (id: number): Promise<Medico | null> => {
  return prisma.medico.findUnique({ where: { id } });
};

export const update = async (id: number, data: MedicoUpdateData): Promise<Medico> => {
  return prisma.medico.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Medico> => {
  return prisma.medico.delete({ where: { id } });
};