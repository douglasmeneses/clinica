import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const getServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.API_URL || "https://clinica-api.onrender.com";
  }
  return "http://localhost:3000";
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Consultório Médico",
      version: "1.0.0",
      description: "API para gerenciar consultas, médicos, pacientes e secretários",
    },
    servers: [
      {
        url: getServerUrl(),
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
