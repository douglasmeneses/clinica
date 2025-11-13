import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Consulta } from "../../types/consulta";

interface ConsultasTableProps {
  consultas: Consulta[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (consulta: Consulta) => void;
  loading: boolean;
}

export const ConsultasTable = ({
  consultas,
  deletingId,
  onDelete,
  onEdit,
  loading,
}: ConsultasTableProps) => {
  const formatarDataHora = (dataHora: string) => {
    const date = new Date(dataHora);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const colunas: string[] = [
    "Data/Hora",
    "Paciente",
    "CPF",
    "Médico",
    "Especialidade",
    "Motivo",
    "Ações",
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          {consultas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                className="py-6 text-gray-500"
              >
                Nenhuma consulta encontrada.
              </TableCell>
            </TableRow>
          ) : (
            consultas.map((consulta) => (
              <TableRow key={consulta.id} hover className="hover:bg-blue-50">
                <TableCell align="center">
                  {formatarDataHora(consulta.dataHora)}
                </TableCell>
                <TableCell align="center">
                  {consulta.paciente?.nome || "-"}
                </TableCell>
                <TableCell align="center">
                  {consulta.paciente?.cpf || "-"}
                </TableCell>
                <TableCell align="center">
                  {consulta.medico?.nome || "-"}
                </TableCell>
                <TableCell align="center">
                  {consulta.medico?.especialidade || "-"}
                </TableCell>
                <TableCell align="center">{consulta.motivo || "-"}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(consulta)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(consulta.id)}
                        disabled={deletingId === consulta.id}
                        aria-label={`remover-${consulta.id}`}
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
