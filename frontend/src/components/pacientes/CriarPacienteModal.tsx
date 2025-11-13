import { useState, useCallback } from "react";
import type { Paciente } from "../../types/paciente";
import { createPaciente } from "../../services/pacienteService";
import { validateCreatePaciente } from "../../schemas/validation";
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

interface CriarPacienteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (novoPaciente: Paciente) => void;
}

export const CriarPacienteModal = ({
  open,
  onClose,
  onSuccess,
}: CriarPacienteModalProps) => {
  const INITIAL_FORM_DATA = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSave = useCallback(async () => {
    const validation = validateCreatePaciente(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setSalvando(true);
    try {
      const novoPaciente = await createPaciente(validation.data);
      onSuccess(novoPaciente);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      setErrors({ submit: "Erro ao criar paciente. Tente novamente." });
    } finally {
      setSalvando(false);
    }
  }, [formData, onSuccess, onClose]);

  const handleClose = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Cadastrar Novo Paciente
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
            required
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
            required
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
            required
            error={!!errors.cpf}
            helperText={errors.cpf}
          />

          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            placeholder="Digite o telefone (opcional)"
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
            required
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
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
            "Cadastrar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CriarPacienteModal;
