import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { createConsultaSchema } from "../../schemas/consultaSchema";
import { validateField } from "../../schemas/validation";
import { getPacientes } from "../../services/pacienteService";
import { getMedicos } from "../../services/medicoService";
import type { Paciente } from "../../types/paciente";
import type { Medico } from "../../types/medico";

interface CriarConsultaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (dados: {
    dataHora: string;
    motivo?: string;
    pacienteId: number;
    medicoId: number;
  }) => Promise<void>;
}

export const CriarConsultaModal = ({
  open,
  onClose,
  onSave,
}: CriarConsultaModalProps) => {
  const [formData, setFormData] = useState({
    dataHora: "",
    motivo: "",
    pacienteId: 0,
    medicoId: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        dataHora: "",
        motivo: "",
        pacienteId: 0,
        medicoId: 0,
      });
      setErrors({});
      setTouched({});
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const [pacientesData, medicosData] = await Promise.all([
        getPacientes(),
        getMedicos(),
      ]);
      setPacientes(pacientesData);
      setMedicos(medicosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(createConsultaSchema, field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field as keyof typeof formData];
    const error = validateField(createConsultaSchema, field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async () => {
    const newTouched: Record<string, boolean> = {};
    const newErrors: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      newTouched[key] = true;
      const error = validateField(
        createConsultaSchema,
        key,
        formData[key as keyof typeof formData]
      );
      if (error) newErrors[key] = error;
    }

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Consulta</DialogTitle>
      <DialogContent>
        {loadingData ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4, mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              select
              label="Paciente"
              value={formData.pacienteId}
              onChange={(e) =>
                handleInputChange("pacienteId", Number(e.target.value))
              }
              onBlur={() => handleBlur("pacienteId")}
              error={touched.pacienteId && !!errors.pacienteId}
              helperText={touched.pacienteId && errors.pacienteId}
              fullWidth
            >
              <MenuItem value={0}>Selecione um paciente</MenuItem>
              {pacientes.map((paciente) => (
                <MenuItem key={paciente.id} value={paciente.id}>
                  {paciente.nome} - {paciente.cpf}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Médico"
              value={formData.medicoId}
              onChange={(e) =>
                handleInputChange("medicoId", Number(e.target.value))
              }
              onBlur={() => handleBlur("medicoId")}
              error={touched.medicoId && !!errors.medicoId}
              helperText={touched.medicoId && errors.medicoId}
              fullWidth
            >
              <MenuItem value={0}>Selecione um médico</MenuItem>
              {medicos.map((medico) => (
                <MenuItem key={medico.id} value={medico.id}>
                  {medico.nome} - {medico.especialidade}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Data e Hora"
              type="datetime-local"
              value={formData.dataHora}
              onChange={(e) => handleInputChange("dataHora", e.target.value)}
              onBlur={() => handleBlur("dataHora")}
              error={touched.dataHora && !!errors.dataHora}
              helperText={touched.dataHora && errors.dataHora}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Motivo (opcional)"
              value={formData.motivo}
              onChange={(e) => handleInputChange("motivo", e.target.value)}
              onBlur={() => handleBlur("motivo")}
              error={touched.motivo && !!errors.motivo}
              helperText={touched.motivo && errors.motivo}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || loadingData}
        >
          {loading ? <CircularProgress size={24} /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
