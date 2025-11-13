import React from "react";
import { IconButton, Tooltip, Paper, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface Props {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const ThemeToggleFloating: React.FC<Props> = ({ toggleColorMode, mode }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: 999,
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
        zIndex: 1400,
      }}
    >
      <Tooltip title={mode === "dark" ? "Modo claro" : "Modo escuro"}>
        <IconButton
          onClick={toggleColorMode}
          size="small"
          aria-label="alternar tema"
        >
          {mode === "dark" ? (
            <Brightness7 fontSize="small" />
          ) : (
            <Brightness4 fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" sx={{ px: 0.5, userSelect: "none" }}>
        {mode === "dark" ? "Claro" : "Escuro"}
      </Typography>
    </Paper>
  );
};

export default ThemeToggleFloating;
