// Importa StrictMode do React para ajudar a identificar problemas no app durante o desenvolvimento
import { StrictMode } from "react";
// Importa a função para criar a raiz da aplicação React
import { createRoot } from "react-dom/client";
// Importa ThemeProvider e createTheme do Material-UI para customizar o tema global
import { ThemeProvider, createTheme } from "@mui/material/styles";
// Importa CssBaseline para aplicar um reset de CSS global do Material-UI
import CssBaseline from "@mui/material/CssBaseline";
// Importa o CSS global (inclui Tailwind e estilos base)
import "./index.css";
// Importa o componente principal da aplicação
import App from "./App.tsx";

// Cria um tema padrão do Material-UI (pode ser customizado)
const theme = createTheme();

// Cria a raiz React e renderiza a aplicação
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    {/* Ativa verificações extras em dev */}
    <ThemeProvider theme={theme}>
      {" "}
      {/* Fornece o tema MUI para toda a app */}
      <CssBaseline /> {/* Aplica normalização de CSS global do MUI */}
      <App /> {/* Renderiza o componente principal da aplicação */}
    </ThemeProvider>
  </StrictMode>
);
