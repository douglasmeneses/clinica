import React from "react";
import type { Paciente } from "../../types/paciente";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface PacientesTableProps {
  pacientes: Paciente[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (paciente: Paciente) => void; // Nova função para editar
}

const PacientesTable: React.FC<PacientesTableProps> = ({
  pacientes,
  deletingId,
  onDelete,
  onEdit,
}) => {
  const colunas: string[] = [
    "Nome",
    "Email",
    "Telefone",
    "CPF",
    "Data de Nascimento",
    "Ações",
  ];

  return (
    <TableContainer className="mt-4 rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-800">
            {colunas.map((coluna) => (
              <TableCell
                key={coluna}
                align="center"
                className="font-bold text-white"
              >
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                className="py-6 text-gray-500"
              >
                Nenhum paciente encontrado.
              </TableCell>
            </TableRow>
          ) : (
            pacientes.map((paciente) => (
              <TableRow key={paciente.id} hover className="hover:bg-blue-50">
                <TableCell align="center">{paciente.nome}</TableCell>
                <TableCell align="center">{paciente.email}</TableCell>
                <TableCell align="center">{paciente.telefone || "-"}</TableCell>
                <TableCell align="center">{paciente.cpf}</TableCell>
                <TableCell align="center">
                  {paciente.dataNascimento?.split("T")[0] || "-"}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(paciente)} // Clicar = abrir modal de edição
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(paciente.id)}
                        disabled={deletingId === paciente.id}
                        aria-label={`remover-${paciente.id}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PacientesTable;
