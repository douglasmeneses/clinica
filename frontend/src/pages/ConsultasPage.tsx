import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ConsultasTable } from "../components/consultas/ConsultasTable";
import { CriarConsultaModal } from "../components/consultas/CriarConsultaModal";
import { EditarConsultaModal } from "../components/consultas/EditarConsultaModal";
import {
  getConsultas,
  deleteConsulta,
  updateConsulta,
  createConsulta,
} from "../services/consultaService";
import type { Consulta } from "../types/consulta";
import { useDebounce } from "../hooks/useDebounce";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

export const ConsultasPage = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalCriarOpen, setModalCriarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] =
    useState<Consulta | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const carregarConsultas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getConsultas();
      setConsultas(data);
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
      setSnackbar({
        open: true,
        message: "Erro ao buscar consultas.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);

    try {
      await deleteConsulta(id);
      setConsultas((prev) => prev.filter((c) => c.id !== id));
      setSnackbar({
        open: true,
        message: "Consulta removida com sucesso.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir consulta:", error);
      setSnackbar({
        open: true,
        message: "Erro ao deletar consulta.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleOpenEditModal = useCallback((consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setModalEditarOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setConsultaSelecionada(null);
    setModalEditarOpen(false);
  }, []);

  const handleSaveEdit = useCallback(
    async (id: number, dados: Partial<Consulta>) => {
      try {
        await updateConsulta(id, dados);
        await carregarConsultas();
        setSnackbar({
          open: true,
          message: "Consulta atualizada com sucesso.",
          severity: "success",
        });
      } catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        setSnackbar({
          open: true,
          message: "Erro ao atualizar consulta.",
          severity: "error",
        });
        throw error;
      }
    },
    [carregarConsultas]
  );

  const handleSucessoCriarConsulta = useCallback(
    async (dados: {
      dataHora: string;
      motivo?: string;
      pacienteId: number;
      medicoId: number;
    }) => {
      try {
        await createConsulta(dados);
        await carregarConsultas();
        setSnackbar({
          open: true,
          message: "Consulta cadastrada com sucesso.",
          severity: "success",
        });
      } catch (error) {
        console.error("Erro ao criar consulta:", error);
        setSnackbar({
          open: true,
          message: "Erro ao criar consulta.",
          severity: "error",
        });
        throw error;
      }
    },
    [carregarConsultas]
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const consultasFiltradas = useMemo(() => {
    let resultado = [...consultas];

    // Filtro de busca por texto
    if (debouncedSearchTerm.trim()) {
      const termoBusca = debouncedSearchTerm.toLowerCase().trim();
      resultado = resultado.filter((consulta) => {
        return (
          consulta.paciente?.nome.toLowerCase().includes(termoBusca) ||
          consulta.paciente?.cpf.includes(termoBusca) ||
          consulta.medico?.nome.toLowerCase().includes(termoBusca) ||
          consulta.medico?.especialidade.toLowerCase().includes(termoBusca) ||
          (consulta.motivo?.toLowerCase().includes(termoBusca) ?? false)
        );
      });
    }

    // Filtro por período de data
    if (filtroData) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      resultado = resultado.filter((consulta) => {
        const dataConsulta = new Date(consulta.dataHora);
        dataConsulta.setHours(0, 0, 0, 0);

        switch (filtroData) {
          case "hoje": {
            return dataConsulta.getTime() === hoje.getTime();
          }
          case "semana": {
            const fimSemana = new Date(hoje);
            fimSemana.setDate(hoje.getDate() + 7);
            return dataConsulta >= hoje && dataConsulta <= fimSemana;
          }
          case "mes": {
            return (
              dataConsulta.getMonth() === hoje.getMonth() &&
              dataConsulta.getFullYear() === hoje.getFullYear()
            );
          }
          case "passadas": {
            return dataConsulta < hoje;
          }
          case "futuras": {
            return dataConsulta > hoje;
          }
          default:
            return true;
        }
      });
    }

    return resultado;
  }, [consultas, debouncedSearchTerm, filtroData]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper
        elevation={3}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 1400,
          p: 3,
          position: "relative",
          bgcolor:
            theme.palette.mode === "dark" ? "#242424" : "background.paper",
          color: theme.palette.text.primary,
          borderRadius: 2,
        })}
      >
        <IconButton
          aria-label="voltar"
          onClick={() => navigate("/home")}
          size="small"
          sx={{ position: "absolute", left: 16, top: 16 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Gerenciar Consultas
        </Typography>

        <Box
          display="flex"
          gap={2}
          mb={3}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box flex={1}>
            <TextField
              fullWidth
              placeholder="Buscar por paciente, médico, especialidade ou motivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              size="small"
            />
          </Box>
          <Box width={{ xs: "100%", md: 300 }}>
            <TextField
              select
              fullWidth
              label="Filtrar por período"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              size="small"
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="hoje">Hoje</MenuItem>
              <MenuItem value="semana">Próximos 7 dias</MenuItem>
              <MenuItem value="mes">Este mês</MenuItem>
              <MenuItem value="futuras">Futuras</MenuItem>
              <MenuItem value="passadas">Passadas</MenuItem>
            </TextField>
          </Box>
        </Box>

        {(debouncedSearchTerm || filtroData) && (
          <Box mb={2} display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Resultados encontrados:
            </Typography>
            <Chip
              label={consultasFiltradas.length}
              size="small"
              color="primary"
              variant="outlined"
            />
            {consultasFiltradas.length !== consultas.length && (
              <Typography variant="body2" color="text.secondary">
                de {consultas.length} total
              </Typography>
            )}
          </Box>
        )}

        <ConsultasTable
          consultas={consultasFiltradas}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
          loading={loading}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            className="uppercase font-bold"
            onClick={() => setModalCriarOpen(true)}
          >
            Cadastrar Nova Consulta
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>

      <CriarConsultaModal
        open={modalCriarOpen}
        onClose={() => setModalCriarOpen(false)}
        onSave={handleSucessoCriarConsulta}
      />

      <EditarConsultaModal
        open={modalEditarOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        consulta={consultaSelecionada}
      />
    </Box>
  );
};
