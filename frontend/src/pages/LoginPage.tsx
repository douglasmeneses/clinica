import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { validateLogin } from "../schemas/validation";
import type { Secretario } from "../types/secretario";
import { login } from "../services/loginService";

const REDIRECT_DELAY = 2000;

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setMsgErro("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validation = validateLogin(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setIsLoading(true);
      setMsgErro("");
      setMsgSucesso("");

      try {
        const secretario: Secretario = await login(
          formData.email,
          formData.senha
        );
        setMsgSucesso(`Bem-vindo(a), ${secretario.nome}!`);

        setTimeout(() => {
          navigate("/home");
        }, REDIRECT_DELAY);
      } catch (error) {
        console.error("Erro no login:", error);
        setMsgErro("Erro ao realizar login. Verifique suas credenciais.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, navigate]
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={2} sx={{ p: 3, width: 320 }}>
        <Box textAlign="center" mb={2}>
          <LoginIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
          <Typography variant="h6" component="h2" fontWeight={600} mb={1}>
            Bem-vindo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça login para acessar o sistema
          </Typography>
        </Box>
        {msgSucesso && <Alert>{msgSucesso}</Alert>}
        {msgErro && <Alert severity="error">{msgErro}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
          />
          <TextField
            label="Senha"
            name="senha"
            type="password"
            fullWidth
            margin="normal"
            value={formData.senha}
            onChange={handleInputChange}
            error={!!errors.senha}
            helperText={errors.senha}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                <span>Carregando...</span>
              </Box>
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
