import { useEffect, useState, useCallback, useMemo } from "react";
import type { Paciente } from "../types/paciente";
import { getPacientes, deletePaciente } from "../services/pacienteService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import PacientesTable from "../components/pacientes/PacientesTable";
import EditarPacienteModal from "../components/pacientes/EditarPacienteModal";
import CriarPacienteModal from "../components/pacientes/CriarPacienteModal";
import { useDebounce } from "../hooks/useDebounce";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

export const PacientesPage = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [pacienteEditando, setPacienteEditando] = useState<Paciente | null>(
    null
  );
  const [abrirModalCriar, setAbrirModalCriar] = useState<boolean>(false);

  useEffect(() => {
    const carregarPacientes = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        setSnackbar({
          open: true,
          message: "Erro ao buscar pacientes.",
          severity: "error",
        });
      }
    };

    carregarPacientes();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);

    try {
      await deletePaciente(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Paciente removido com sucesso.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      setSnackbar({
        open: true,
        message: "Erro ao deletar paciente.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleOpenEditModal = useCallback((paciente: Paciente) => {
    setPacienteEditando(paciente);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setPacienteEditando(null);
  }, []);

  const handleSavePaciente = useCallback((pacienteAtualizado: Paciente) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === pacienteAtualizado.id ? pacienteAtualizado : p))
    );
    setSnackbar({
      open: true,
      message: "Paciente atualizado com sucesso.",
      severity: "success",
    });
  }, []);

  const handleSucessoCriarPaciente = useCallback((novoPaciente: Paciente) => {
    setPacientes((prev) => [...prev, novoPaciente]);
    setSnackbar({
      open: true,
      message: "Paciente cadastrado com sucesso.",
      severity: "success",
    });
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const pacientesFiltrados = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return pacientes;

    const termoBusca = debouncedSearchTerm.toLowerCase().trim();

    return pacientes.filter((paciente) => {
      return (
        paciente.nome.toLowerCase().includes(termoBusca) ||
        paciente.email.toLowerCase().includes(termoBusca) ||
        paciente.cpf.includes(termoBusca) ||
        (paciente.telefone?.includes(termoBusca) ?? false)
      );
    });
  }, [pacientes, debouncedSearchTerm]);

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
          maxWidth: 1000,
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
          Lista de Pacientes
        </Typography>

        <Box mb={3}>
          <TextField
            fullWidth
            placeholder="Buscar por nome, email, CPF ou telefone..."
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
          {debouncedSearchTerm && (
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Resultados encontrados:
              </Typography>
              <Chip
                label={pacientesFiltrados.length}
                size="small"
                color="primary"
                variant="outlined"
              />
              {pacientesFiltrados.length !== pacientes.length && (
                <Typography variant="body2" color="text.secondary">
                  de {pacientes.length} total
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <PacientesTable
          pacientes={pacientesFiltrados}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            className="uppercase font-bold"
            onClick={() => setAbrirModalCriar(true)}
          >
            Novo Paciente
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

      <EditarPacienteModal
        open={pacienteEditando !== null}
        paciente={pacienteEditando}
        onClose={handleCloseEditModal}
        onSave={handleSavePaciente}
      />

      <CriarPacienteModal
        open={abrirModalCriar}
        onClose={() => setAbrirModalCriar(false)}
        onSuccess={handleSucessoCriarPaciente}
      />
    </Box>
  );
};

export default PacientesPage;
