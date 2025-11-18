import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();

// Configuração CORS - permite requisições do frontend (suporta produção)
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

setupSwagger(app);

app.use("", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for: ${CORS_ORIGIN}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
