/**
 * Configuração centralizada da API
 * Suporta múltiplos ambientes (dev, produção, etc)
 */

export const getApiUrl = (): string => {
  // Se houver variável de ambiente, usar
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Em produção, usar URL relativa (mesmo domínio)
  if (import.meta.env.PROD) {
    return "";
  }

  // Em desenvolvimento, usar localhost
  return "http://localhost:3333";
};

export const API_BASE_URL = getApiUrl();

// URLs dos endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,

  // Médicos
  MEDICOS: `${API_BASE_URL}/medicos`,

  // Pacientes
  PACIENTES: `${API_BASE_URL}/pacientes`,

  // Consultas
  CONSULTAS: `${API_BASE_URL}/consultas`,
};
