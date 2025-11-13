import { useState, useEffect, useCallback } from "react";
import type { Paciente } from "../../types/paciente";
import { updatePaciente } from "../../services/pacienteService";
import { validateUpdatePaciente } from "../../schemas/validation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

interface EditarPacienteModalProps {
  open: boolean;
  paciente: Paciente | null;
  onClose: () => void;
  onSave: (pacienteAtualizado: Paciente) => void;
}

export const EditarPacienteModal = ({
  open,
  paciente,
  onClose,
  onSave,
}: EditarPacienteModalProps) => {
  const INITIAL_FORM_DATA: Paciente = {
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
  };

  const [formData, setFormData] = useState<Paciente>(INITIAL_FORM_DATA);
  const [salvando, setSalvando] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (paciente && open) {
      setFormData({
        ...paciente,
        dataNascimento: paciente.dataNascimento?.split("T")[0] || "",
      });
      setErrors({});
    }
  }, [paciente, open]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    const validation = validateUpdatePaciente(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setSalvando(true);
    try {
      await updatePaciente(validation.data.id, validation.data);
      onSave(validation.data);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      setErrors({ submit: "Erro ao salvar paciente. Tente novamente." });
    } finally {
      setSalvando(false);
    }
  }, [formData, onSave, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Editar Paciente
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
            error={!!errors.nome}
            helperText={errors.nome}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite o email"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="Digite o CPF"
            error={!!errors.cpf}
            helperText={errors.cpf}
          />

          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            placeholder="Digite o telefone"
            error={!!errors.telefone}
            helperText={errors.telefone}
          />

          <TextField
            fullWidth
            label="Data de Nascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={salvando}
        >
          {salvando ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Salvando...
            </>
          ) : (
            "Salvar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarPacienteModal;
