export interface Consulta {
  id: number;
  dataHora: string;
  motivo?: string;
  pacienteId: number;
  medicoId: number;
  paciente?: {
    nome: string;
    cpf: string;
  };
  medico?: {
    nome: string;
    especialidade: string;
  };
}
